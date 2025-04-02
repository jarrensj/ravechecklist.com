
import React from 'react';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <Separator className="mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-xs text-gray-500 max-w-2xl">
            <p>
              <strong>Disclaimer:</strong> RaveChecklist is not affiliated with, endorsed by, or sponsored by any music festivals or event organizers. 
              All festival names, logos, and trademarks are the property of their respective owners.
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            🍣 🦄
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
