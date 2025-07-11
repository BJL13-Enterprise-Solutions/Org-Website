import { conversations, messages, localServices, users, documents, type Conversation, type Message, type LocalService, type InsertConversation, type InsertMessage, type InsertLocalService, type User, type UpsertUser, type Document, type InsertDocument } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations (for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserAiMemoryPreference(userId: string, enabled: boolean): Promise<void>;
  
  // Conversation management
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(id: number): Promise<Conversation | undefined>;
  getConversationBySessionId(sessionId: string): Promise<Conversation | undefined>;
  getUserConversations(userId: string): Promise<Conversation[]>;
  
  // Message management
  addMessage(message: InsertMessage): Promise<Message>;
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
  
  // Local services
  getLocalServices(category?: string): Promise<LocalService[]>;
  createLocalService(service: InsertLocalService): Promise<LocalService>;
  
  // Document management (for RAG)
  getDocuments(category?: string, jurisdiction?: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  searchDocuments(query: string, category?: string): Promise<Document[]>;
}



// Database implementation
export class DatabaseStorage implements IStorage {
  // User operations for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserAiMemoryPreference(userId: string, enabled: boolean): Promise<void> {
    await db
      .update(users)
      .set({ aiMemoryEnabled: enabled, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conversation] = await db
      .insert(conversations)
      .values({
        ...insertConversation,
        userId: insertConversation.userId ?? null,
      })
      .returning();
    return conversation;
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    return conversation || undefined;
  }

  async getConversationBySessionId(sessionId: string): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.sessionId, sessionId));
    return conversation || undefined;
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(conversations.createdAt);
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.timestamp);
  }

  async getLocalServices(category?: string): Promise<LocalService[]> {
    if (category) {
      return await db
        .select()
        .from(localServices)
        .where(eq(localServices.category, category));
    }
    return await db.select().from(localServices);
  }

  async createLocalService(insertService: InsertLocalService): Promise<LocalService> {
    const [service] = await db
      .insert(localServices)
      .values(insertService)
      .returning();
    return service;
  }

  // Document management for RAG system
  async getDocuments(category?: string, jurisdiction?: string): Promise<Document[]> {
    let conditions = [eq(documents.isActive, true)];
    
    if (category) {
      conditions.push(eq(documents.category, category));
    }
    
    if (jurisdiction) {
      conditions.push(eq(documents.jurisdiction, jurisdiction));
    }
    
    return await db
      .select()
      .from(documents)
      .where(conditions.length === 1 ? conditions[0] : and(...conditions))
      .orderBy(documents.createdAt);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return document;
  }

  async searchDocuments(query: string, category?: string): Promise<Document[]> {
    // Basic text search - in production this would use vector search/embeddings
    let conditions = [eq(documents.isActive, true)];
    
    if (category) {
      conditions.push(eq(documents.category, category));
    }
    
    const results = await db
      .select()
      .from(documents)
      .where(conditions.length === 1 ? conditions[0] : and(...conditions));
    
    // For now, simple text search. TODO: Implement vector search with embeddings
    const searchTerms = query.toLowerCase().split(' ');
    
    return results.filter(doc => {
      const searchText = `${doc.title} ${doc.content}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    });
  }
}

export const storage = new DatabaseStorage();
