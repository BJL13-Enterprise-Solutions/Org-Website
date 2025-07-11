import { Shield, User, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function PrivacyBanner() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Card className="mb-4 border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-green-800">
            <UserCheck className="h-4 w-4" />
            <span className="text-sm font-medium">
              Signed in for personalized help
            </span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Your conversations are saved and the AI can remember your preferences. 
            <a href="/api/logout" className="underline ml-1">Sign out</a> to return to anonymous mode.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-800">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Your privacy is protected</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/api/login'}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <User className="h-3 w-3 mr-1" />
            Sign in for memory
          </Button>
        </div>
        <p className="text-sm text-blue-700 mt-2">
          You're using anonymous mode. Your conversations aren't saved or linked to you. 
          Sign in to let the AI remember your preferences and conversation history.
        </p>
      </CardContent>
    </Card>
  );
}