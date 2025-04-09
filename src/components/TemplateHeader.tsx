
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TemplateHeaderProps {
  name: string;
}

const TemplateHeader: React.FC<TemplateHeaderProps> = ({ name }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/templates')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
      </Button>
      
      <h1 className="text-3xl font-bold">{name} Checklist</h1>
      <p className="text-gray-600">Customize this template for your festival trip</p>
    </div>
  );
};

export default TemplateHeader;
