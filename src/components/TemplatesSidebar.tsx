import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Music, X, PanelLeftClose, PanelLeft, AlertCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
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
  
  const handleGoToPersonalChecklist = () => {
    navigate('/checklist', { 
      state: { 
        showPersonalChecklist: true,
        fromTemplateId: currentTemplateId
      } 
    });
    if (isOpen) {
      onToggle(); // Close sidebar on mobile after navigation
    }
  };
  
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

  return (
    <TooltipProvider>
      {/* Overlay for mobile when expanded */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar - always visible, just changes width */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r shadow-lg z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-16'
      }`}>
        {/* Header */}
        <div className={`border-b flex items-center bg-sky-50 ${
          isOpen ? 'p-4 justify-between' : 'p-3 justify-center'
        }`}>
          {isOpen ? (
            <>
              <h2 className="font-semibold text-lg">Checklists</h2>
              <Button
                onClick={onToggle}
                variant="ghost"
                size="icon"
                aria-label="Collapse checklists sidebar"
              >
                <PanelLeftClose className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  size="icon"
                  aria-label="Expand checklists sidebar"
                >
                  <PanelLeft className="h-5 w-5 text-sky-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Expand Checklists</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Templates List */}
        <ScrollArea className="flex-1">
          {isOpen ? (
            // Expanded view - show full cards
            <div className="p-4 space-y-4">
              {/* Personal Checklist Card */}
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !currentTemplateId ? 'ring-2 ring-sky-500 bg-sky-50' : ''
                }`}
                onClick={handleGoToPersonalChecklist}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-5 w-5 text-sky-600" />
                    My Personal Checklist
                    {!currentTemplateId && (
                      <Badge className="ml-auto bg-sky-600">
                        Active
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Your custom festival checklist
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Templates</span>
                </div>
              </div>

              <Alert className="border-sky-200 bg-sky-50">
                <AlertCircle className="h-4 w-4 text-sky-600" />
                <AlertDescription className="text-sm text-sky-700">
                  Click any checklist to load it
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
                    {template.thumbnail && (
                      <div className="aspect-video w-full overflow-hidden relative">
                        {isPast && <div className="absolute inset-0 bg-gray-500/20 z-10"></div>}
                        {isActive && (
                          <Badge className="absolute top-2 right-2 z-20 bg-sky-600">
                            Active
                          </Badge>
                        )}
                        <img 
                          src={template.thumbnail} 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
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
                          ).length} categories ? {template.items.length} items
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            // Collapsed view - show icon buttons with tooltips
            <div className="py-4 space-y-2 flex flex-col items-center">
              {/* Personal Checklist Icon Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleGoToPersonalChecklist}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all relative ${
                      !currentTemplateId 
                        ? 'bg-sky-600 text-white ring-2 ring-sky-400 ring-offset-2' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    {!currentTemplateId && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-semibold">My Personal Checklist</p>
                    <p className="text-xs text-gray-500">Your custom festival checklist</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              
              {/* Separator */}
              <div className="w-8 h-px bg-gray-300 my-2"></div>
              
              {sortedTemplates.map(template => {
                const isPast = template.event.startDate && template.event.startDate < now;
                const isActive = currentTemplateId === template.id;
                const initials = template.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                
                return (
                  <Tooltip key={template.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectTemplate(template.id)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all relative ${
                          isActive 
                            ? 'bg-sky-600 text-white ring-2 ring-sky-400 ring-offset-2' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${isPast ? 'opacity-40' : ''}`}
                      >
                        {initials}
                        {isActive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <div className="max-w-xs">
                        <p className="font-semibold">{template.name}</p>
                        <p className="text-xs text-gray-500">{template.event.location}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {template.event.startDate && template.event.endDate ? 
                            formatDateRange(template.event.startDate, template.event.endDate) : 
                            template.event.date}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};

export default TemplatesSidebar;

