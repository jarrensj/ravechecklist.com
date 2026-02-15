
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, ClipboardList, Home, List, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
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
          >
            <img 
              src="/unicorn.png" 
              alt="RaveChecklist Logo" 
              className="h-8 w-auto sm:h-10" 
            />
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">RaveChecklist</h1>
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
                    className={`transition-colors flex items-center ${isActive('/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                  >
                    <Home className="mr-1 h-4 w-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checklist"
                    className={`transition-colors flex items-center ${isActive('/checklist') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                  >
                    <ClipboardList className="mr-1 h-4 w-4" />
                    Checklist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className={`transition-colors flex items-center ${isActive('/blog') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                  >
                    <BookOpen className="mr-1 h-4 w-4" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className={`transition-colors flex items-center ${isActive('/settings') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                  >
                    <Settings className="mr-1 h-4 w-4" />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 py-3 border-t border-border animate-fade-in">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link
                    to="/"
                    className={`block transition-colors flex items-center ${isActive('/') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/checklist"
                    className={`block transition-colors flex items-center ${isActive('/checklist') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Checklist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className={`block transition-colors flex items-center ${isActive('/blog') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className={`block transition-colors flex items-center ${isActive('/settings') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
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
