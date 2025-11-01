
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const TemplateNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Template Not Found</CardTitle>
          <CardDescription>The template you're looking for doesn't exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/templates')} className="w-full">
            Back to Templates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateNotFound;
