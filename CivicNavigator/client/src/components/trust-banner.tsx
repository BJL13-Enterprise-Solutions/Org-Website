import { Info } from "lucide-react";

export default function TrustBanner() {
  return (
    <div className="trust-banner">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start space-x-3">
          <Info className="text-secondary text-lg mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">This helper explains paperwork and connects you with real people when needed.</p>
            <p className="mt-1">For urgent legal matters, always talk to a lawyer or advocate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
