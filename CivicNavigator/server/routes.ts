import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { setupAuth, isAuthenticated, optionalAuth } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update AI memory preference
  app.post('/api/auth/ai-memory', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { enabled } = req.body;
      await storage.updateUserAiMemoryPreference(userId, enabled);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating AI memory preference:", error);
      res.status(500).json({ message: "Failed to update preference" });
    }
  });

  // Get user conversations (requires auth)
  app.get('/api/conversations/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const conversations = await storage.getUserConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversation history:", error);
      res.status(500).json({ message: "Failed to fetch conversation history" });
    }
  });

  // Get or create conversation by session ID
  app.post("/api/conversations", optionalAuth, async (req: any, res) => {
    try {
      const { sessionId } = insertConversationSchema.parse(req.body);
      
      // Check if conversation already exists for this session
      let conversation = await storage.getConversationBySessionId(sessionId);
      
      if (!conversation) {
        const userId = req.user?.claims?.sub || null;
        conversation = await storage.createConversation({ 
          sessionId,
          userId 
        });
      }
      
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: "Invalid conversation data" });
    }
  });

  // Get conversation messages
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessagesByConversationId(conversationId);
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: "Invalid conversation ID" });
    }
  });

  // Add message to conversation
  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messageData = insertMessageSchema.parse({
        ...req.body,
        conversationId,
      });
      
      const message = await storage.addMessage(messageData);
      
      // If this is a user message, generate an AI response
      if (messageData.role === "user") {
        // For now, provide a simple response
        // TODO: Integrate with actual AI service
        const aiResponse = generateSimpleResponse(messageData.content);
        
        const aiMessage = await storage.addMessage({
          conversationId,
          content: aiResponse,
          role: "assistant",
        });
        
        // Return both messages
        res.json([message, aiMessage]);
      } else {
        res.json([message]);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // Get local services
  app.get("/api/local-services", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const services = await storage.getLocalServices(category);
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch local services" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Document routes for RAG system
  app.get("/api/documents", async (req, res) => {
    try {
      const { category, jurisdiction } = req.query;
      const documents = await storage.getDocuments(
        category as string | undefined,
        jurisdiction as string | undefined
      );
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.get("/api/documents/search", async (req, res) => {
    try {
      const { q: query, category } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const documents = await storage.searchDocuments(
        query,
        category as string | undefined
      );
      res.json(documents);
    } catch (error) {
      console.error("Error searching documents:", error);
      res.status(500).json({ error: "Failed to search documents" });
    }
  });

  // Create document (requires authentication)
  app.post("/api/documents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const documentData = {
        ...req.body,
        uploadedBy: userId,
      };
      const document = await storage.createDocument(documentData);
      res.json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(400).json({ error: "Invalid document data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simple response generator - replace with actual AI integration
function generateSimpleResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("eviction") || lowerMessage.includes("court letter") || lowerMessage.includes("landlord")) {
    return `I understand you're dealing with a housing issue. Here's what I can help you with:

**Understanding Your Rights:**
- As a tenant, you have specific legal protections
- There are usually required notice periods and procedures landlords must follow
- You may have options to respond or dispute

**Immediate Steps:**
1. Don't ignore any court papers - there are strict deadlines
2. Gather all your documentation (lease, payments, correspondence)
3. Contact Legal Aid of Western Missouri at (816) 474-6750 for free legal help

**Local Resources:**
- Heart of America United Way: Call 211 for emergency assistance
- Kansas City Tenant Helpline: Can provide guidance on your rights

Would you like me to help you understand specific language in your documents, or connect you with local tenant advocates?`;
  }
  
  if (lowerMessage.includes("benefits") || lowerMessage.includes("snap") || lowerMessage.includes("medicaid")) {
    return `I can help you navigate public benefits applications. Here's how:

**Common Benefits Available:**
- SNAP (food assistance)
- Medicaid (healthcare coverage)
- TANF (temporary cash assistance)
- Utility assistance programs

**Getting Started:**
1. Gather required documents (ID, income proof, residence verification)
2. Apply online at mydss.mo.gov or visit your local Family Support Division office
3. Don't be discouraged if denied initially - appeals are common and often successful

**Local Help:**
- Call 211 for assistance finding application help
- Many community organizations offer benefits application assistance

What specific benefits are you interested in learning about?`;
  }
  
  if (lowerMessage.includes("legal") || lowerMessage.includes("court") || lowerMessage.includes("lawyer")) {
    return `For legal matters, here's how I can help:

**Understanding Legal Documents:**
- I can help translate legal language into plain English
- Explain common legal procedures and deadlines
- Help you understand your options

**Finding Legal Help:**
- Legal Aid of Western Missouri: (816) 474-6750 (free for qualifying income)
- Kansas City Bar Association Lawyer Referral: (816) 474-4322
- Pro bono clinics available through local law schools

**Important Reminder:**
While I can help you understand documents and procedures, I cannot provide legal advice. For representation or specific legal counsel, always consult with a qualified attorney.

What specific legal document or situation would you like help understanding?`;
  }
  
  return `Thank you for reaching out. I'm here to help you navigate bureaucracy and understand official documents.

**How I Can Help:**
- Translate confusing official language into plain English
- Explain your options and next steps
- Connect you with local Kansas City resources
- Help you understand forms and documents

**To Give You Better Help:**
- Tell me more about your specific situation
- Upload any documents you'd like me to help explain
- Let me know if you're in the Kansas City area for local resources

What would you like help with today?`;
}
