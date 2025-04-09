import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') {
      // For home, check that we're either at root or viewing a template
      return location.pathname === '/' || location.pathname.startsWith('/templates/');
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="py-4 mb-6 w-full">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <img 
              src="/lovable-uploads/347c3585-2166-4fdb-9689-dbf603407dea.png" 
              alt="RaveChecklist Logo" 
              className="h-8 w-auto sm:h-10" 
            />
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">RaveChecklist</h1>
          </Link>
          
          {isMobile ? (
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          ) : (
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/" 
                    className={`transition-colors ${isActive('/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/templates" 
                    className={`transition-colors ${isActive('/templates') && !isActive('/templates/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 py-3 border-t border-gray-200 animate-fade-in">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link 
                    to="/" 
                    className={`block transition-colors ${isActive('/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/templates" 
                    className={`block transition-colors ${isActive('/templates') && !isActive('/templates/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
