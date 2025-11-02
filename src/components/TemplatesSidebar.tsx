import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Music, X, PanelLeftClose, PanelLeft, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TemplatesSidebarProps {
  onSelectTemplate: (templateId: string) => void;
  currentTemplateId?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const TemplatesSidebar: React.FC<TemplatesSidebarProps> = ({ 
  onSelectTemplate, 
  currentTemplateId,
  isOpen,
  onToggle
}) => {
  // Sort templates by startDate - upcoming events first, past events at the end
  const sortedTemplates = [...templates].sort((a, b) => {
    if (!a.event.startDate || !b.event.startDate) {
      return 0;
    }
    
    const now = new Date();
    const aIsPast = a.event.startDate < now;
    const bIsPast = b.event.startDate < now;
    
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;
    
    return a.event.startDate.getTime() - b.event.startDate.getTime();
  });
  
  const formatDateRange = (startDate?: Date, endDate?: Date) => {
    if (!startDate) return "Date TBD";
    
    if (!endDate || startDate.getTime() === endDate.getTime()) {
      return format(startDate, 'MMM d, yyyy');
    }
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`;
    }
    
    if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    
    return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
  };
  
  const now = new Date();

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="fixed left-4 top-24 z-40 shadow-lg"
        aria-label="Open templates sidebar"
      >
        <PanelLeft className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onToggle}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-sky-50">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-sky-600" />
            <h2 className="font-semibold text-lg">Templates</h2>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="icon"
            aria-label="Close templates sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        </div>

        {/* Templates List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <Alert className="border-sky-200 bg-sky-50">
              <AlertCircle className="h-4 w-4 text-sky-600" />
              <AlertDescription className="text-sm text-sky-700">
                Click any template to use it as your checklist
              </AlertDescription>
            </Alert>

            {sortedTemplates.map(template => {
              const isPast = template.event.startDate && template.event.startDate < now;
              const isActive = currentTemplateId === template.id;
              
              return (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isPast ? 'opacity-60' : ''
                  } ${isActive ? 'ring-2 ring-sky-500 bg-sky-50' : ''}`}
                  onClick={() => onSelectTemplate(template.id)}
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    {isPast && <div className="absolute inset-0 bg-gray-500/20 z-10"></div>}
                    {isActive && (
                      <Badge className="absolute top-2 right-2 z-20 bg-sky-600">
                        Active
                      </Badge>
                    )}
                    <img 
                      src={template.thumbnail || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop'} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-xs">{template.event.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        <strong>When:</strong> {template.event.startDate && template.event.endDate ? 
                          formatDateRange(template.event.startDate, template.event.endDate) : 
                          template.event.date}
                      </div>
                      <div className="text-gray-500">
                        {Object.keys(
                          template.items.reduce((acc, item) => {
                            acc[item.category] = true;
                            return acc;
                          }, {} as Record<string, boolean>)
                        ).length} categories • {template.items.length} items
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default TemplatesSidebar;

