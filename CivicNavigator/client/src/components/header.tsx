import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSafeExit = () => {
    window.location.href = "https://www.wunderground.com/wundermap";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">Community Solutions</h1>
              <p className="text-sm text-gray-600">Your Helper for Official Paperwork</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#help" className="text-gray-700 hover:text-secondary transition-colors">
                Get Help
              </a>
              <a href="#resources" className="text-gray-700 hover:text-secondary transition-colors">
                Local Resources
              </a>
              <a href="#contact" className="text-gray-700 hover:text-secondary transition-colors">
                Human Support
              </a>
            </nav>
            
            <button
              onClick={handleSafeExit}
              className="hidden md:flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors text-sm"
              title="Quick exit to safe site"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Escape</span>
            </button>
            
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              <a 
                href="#help" 
                className="block px-4 py-2 text-gray-700 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Help
              </a>
              <a 
                href="#resources" 
                className="block px-4 py-2 text-gray-700 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Local Resources
              </a>
              <a 
                href="#contact" 
                className="block px-4 py-2 text-gray-700 hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Human Support
              </a>
              <button
                onClick={handleSafeExit}
                className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-red-600 transition-colors w-full text-left"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Escape (Quick Exit)</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
