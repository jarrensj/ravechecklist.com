
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  return (
    <header className="py-4 mb-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/347c3585-2166-4fdb-9689-dbf603407dea.png" 
              alt="RaveChecklist Logo" 
              className="h-10 w-auto" 
            />
            <h1 className="text-2xl font-bold text-gray-900">RaveChecklist</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`transition-colors ${isActive('/') && !isActive('/templates') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/templates" 
                  className={`transition-colors ${isActive('/templates') ? 'text-sky-600 font-medium' : 'text-gray-600 hover:text-sky-600'}`}
                >
                  Templates
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
