import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Mail, MessageCircle } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 mt-8">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
        <Separator className="mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-xs text-gray-500 max-w-2xl">
            <p>
              <strong>Disclaimer:</strong> RaveChecklist is not affiliated with, endorsed by, or sponsored by any music festivals or event organizers. 
              All festival names, logos, and trademarks are the property of their respective owners. We are not responsible for the accuracy of this information. 
              Please always check the official allowed and prohibited items list for your specific festival. If you notice any incorrect information, 
              please contact us for corrections. Some links on this site may be affiliate links, and we may earn a commission if you make a purchase through these links.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-gray-600">
              <a href="mailto:omakasemoney@gmail.com" className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-xs">Contact</span>
              </a>
              <a href="https://discord.gg/omakase" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Discord</span>
              </a>
            </div>
            <a 
              href="https://kwaji.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-xs text-gray-500"
            >
              🍣🦄
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
