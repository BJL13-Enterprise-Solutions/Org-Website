import { Mail, Github, Bug } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-primary mb-3">BJL13 Enterprise Solutions, LLC</h3>
            <p className="text-sm text-gray-600 mb-3">
              A helper for understanding paperwork and finding local resources.
            </p>
            <div className="text-sm text-gray-500">
              <p>bjl13.com • bjl13.org</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-3">What We Believe</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Everyone deserves clear information</li>
              <li>• People should control their own data</li>
              <li>• Help should be easy to find</li>
              <li>• Your privacy matters</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-3">Get Support</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                support@bjl13.com
              </p>
              <p className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                Contribute on GitHub
              </p>
              <p className="flex items-center">
                <Bug className="mr-2 h-4 w-4" />
                Report Issues
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 BJL13 Enterprise Solutions, LLC. Built with respect for people and their right to understand what affects them.</p>
        </div>
      </div>
    </footer>
  );
}
