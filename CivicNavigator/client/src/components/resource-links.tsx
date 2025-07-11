import { Phone, Users, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const emergencyContacts = [
  { label: "National Suicide Prevention", number: "988" },
  { label: "Crisis Text Line", number: "Text HOME to 741741" },
  { label: "Legal Aid Hotline", number: "(816) 474-6750" },
  { label: "Housing Crisis", number: "Call 211" },
];

const localOrganizations = [
  { name: "Legal Aid of Western Missouri", description: "Free legal help" },
  { name: "Metropolitan Organization", description: "Community advocacy" },
  { name: "Heart of America United Way", description: "211 resource connection" },
  { name: "COMBAT", description: "Substance abuse resources" },
];

export default function ResourceLinks() {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold text-primary mb-6">When you need human help</h3>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-primary mb-3 flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2" />
                Emergency & Crisis Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {emergencyContacts.map((contact, index) => (
                  <li key={index}>
                    <strong>{contact.label}:</strong> {contact.number}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-3 flex items-center">
                <Users className="h-5 w-5 text-secondary mr-2" />
                Local Organizations
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {localOrganizations.map((org, index) => (
                  <li key={index}>
                    <strong>{org.name}:</strong> {org.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Card className="trust-banner">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Info className="text-secondary text-lg mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">
                      Remember: This AI assistant is a tool to help you understand your options.
                    </p>
                    <p>
                      For legal advice, representation, or urgent situations, always contact a qualified human professional or organization.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
