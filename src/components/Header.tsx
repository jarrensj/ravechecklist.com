
import React from 'react';
import { PlaneTakeoff } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PlaneTakeoff className="h-8 w-8 text-sky-600" />
            <h1 className="text-2xl font-bold text-gray-900">AirportChecklist</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Checklists</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-600 transition-colors">Templates</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
