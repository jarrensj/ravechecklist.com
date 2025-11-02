import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TemplatesSidebar from './TemplatesSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize sidebar state from localStorage
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);
  
  // Determine current template ID from URL
  const getCurrentTemplateId = () => {
    const checklistMatch = location.pathname.match(/^\/checklist\/(.+)$/);
    if (checklistMatch) return checklistMatch[1];
    
    const templateMatch = location.pathname.match(/^\/templates\/(.+)$/);
    if (templateMatch) return templateMatch[1];
    
    return undefined;
  };
  
  const currentTemplateId = getCurrentTemplateId();
  
  // Handle template selection from sidebar
  const handleSelectTemplate = (id: string) => {
    navigate(`/checklist/${id}`);
  };
  
  return (
    <>
      {/* Templates Sidebar */}
      <TemplatesSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onSelectTemplate={handleSelectTemplate}
        currentTemplateId={currentTemplateId}
      />
      
      {/* Main content area with margin for sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-16'}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
