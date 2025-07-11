import Header from "@/components/header";
import TrustBanner from "@/components/trust-banner";
import PrivacyBanner from "@/components/privacy-banner";
import ConversationInterface from "@/components/conversation-interface";
import QuickActions from "@/components/quick-actions";
import LocalServices from "@/components/local-services";
import ResourceLinks from "@/components/resource-links";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        <TrustBanner />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PrivacyBanner />
          <ConversationInterface />
          <QuickActions />
          <LocalServices />
          <ResourceLinks />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
