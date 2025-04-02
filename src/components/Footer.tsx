
import React from 'react';
import { Heart } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <Separator className="mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 max-w-2xl">
            <p>
              <strong>Disclaimer:</strong> RaveChecklist is not affiliated with, endorsed by, or sponsored by any music festivals or event organizers. 
              All festival names, logos, and trademarks are the property of their respective owners.
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 inline" /> by RaveChecklist Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
