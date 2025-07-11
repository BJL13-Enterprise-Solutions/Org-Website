import { useQuery } from "@tanstack/react-query";
import { MapPin, Stamp, Languages, ArrowRight, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LocalService } from "@shared/schema";

export default function LocalServices() {
  const { data: notaryServices = [] } = useQuery<LocalService[]>({
    queryKey: ["/api/local-services", "notary"],
    queryFn: async () => {
      const response = await fetch("/api/local-services?category=notary");
      if (!response.ok) throw new Error("Failed to fetch notary services");
      return response.json();
    },
  });

  const handleFindNotary = () => {
    // TODO: Implement notary finder functionality
    console.log("Find notary clicked");
  };

  const handleGetNotified = () => {
    // TODO: Implement notification signup
    console.log("Get notified clicked");
  };

  return (
    <section className="mb-8">
      <Card className="local-services-highlight">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <MapPin className="text-white h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary mb-2">Kansas City Area Services</h3>
              <p className="text-gray-700 mb-4">
                If you're in the Kansas City area, I can connect you with local resources and services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Stamp className="text-accent h-5 w-5" />
                      <h4 className="font-medium text-primary">Notary Services</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Get your documents notarized locally through our partner network.
                    </p>
                    {notaryServices.length > 0 && (
                      <p className="text-xs text-gray-500 mb-3">
                        {notaryServices.length} notary service{notaryServices.length !== 1 ? 's' : ''} available
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFindNotary}
                      className="text-accent hover:text-green-700"
                    >
                      Find Notary Near Me <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Languages className="text-accent h-5 w-5" />
                      <h4 className="font-medium text-primary">Translation Coming Soon</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      We're working on forms in Spanish, Somali, and other languages.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGetNotified}
                      className="text-accent hover:text-green-700"
                    >
                      Get Notified <Bell className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
