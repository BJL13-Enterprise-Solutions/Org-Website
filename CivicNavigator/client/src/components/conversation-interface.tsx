import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, User, Send, Paperclip, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import type { Message, Conversation } from "@shared/schema";

export default function ConversationInterface() {
  const [userInput, setUserInput] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Create or get conversation
  const { data: conversation } = useQuery<Conversation>({
    queryKey: ["/api/conversations", sessionId],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/conversations", { sessionId });
      return response.json();
    },
  });

  // Get messages for the conversation
  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/conversations", conversation?.id, "messages"],
    queryFn: async () => {
      if (!conversation?.id) return [];
      const response = await apiRequest("GET", `/api/conversations/${conversation.id}/messages`);
      return response.json();
    },
    enabled: !!conversation?.id,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!conversation?.id) throw new Error("No conversation");
      const response = await apiRequest("POST", `/api/conversations/${conversation.id}/messages`, {
        content,
        role: "user",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations", conversation?.id, "messages"],
      });
      setUserInput("");
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(userInput.trim());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement file upload processing
      console.log("File selected:", file.name);
      setUserInput(prev => prev + `\n[Uploaded file: ${file.name}]`);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">What brings you here today?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell me about what's going on. I'm here to help you figure out your next steps.
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {/* Welcome message */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Bot className="text-white text-sm" />
            </div>
            <div className="ai-message flex-1">
              <p className="conversation-message">
                Hi there! I help people understand confusing official letters and paperwork. 
                Whether it's something from the court, your landlord, insurance, or any government office - I can help explain what it means and what you can do about it.
              </p>
            </div>
          </div>

          {/* Conversation messages */}
          {messagesLoading ? (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading conversation...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Bot className="text-white text-sm" />
                  </div>
                )}
                
                <div
                  className={`${
                    message.role === "user" 
                      ? "user-message" 
                      : "ai-message flex-1"
                  }`}
                >
                  <div className="conversation-message whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="text-gray-600 text-sm" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <div className="border-t border-gray-200 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tell me what's happening or what paperwork you got..."
                className="min-h-[100px] text-lg pr-12 resize-none"
                disabled={sendMessageMutation.isPending}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute bottom-3 right-3"
                disabled={!userInput.trim() || sendMessageMutation.isPending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* File upload and security notice */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer text-gray-600 hover:text-secondary transition-colors">
                <Paperclip className="mr-2 h-4 w-4" />
                <span>Share a photo of your paperwork</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileUpload}
                />
              </label>
              <div className="text-sm text-gray-500 flex items-center">
                <Shield className="mr-1 h-4 w-4" />
                Your information stays private
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
