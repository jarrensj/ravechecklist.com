
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Wand2, ChevronDown, ListRestart } from 'lucide-react';
import { templates, ChecklistItem, EventInfo } from '@/utils/data';
import { format } from 'date-fns';

interface TemplateSelectorProps {
  className?: string;
  onAutofill: (templateId: string) => void;
  onLoadBaseChecklist: () => void;
  currentChecklist: ChecklistItem[];
  currentEvent: EventInfo;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  className, 
  onAutofill, 
  onLoadBaseChecklist, 
  currentChecklist, 
  currentEvent 
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState<'base' | string | null>(null);

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

  // Check if user has customized checklist or event info
  const hasCustomization = () => {
    // Check if checklist has items
    if (currentChecklist.length > 0) {
      return true;
    }
    
    // Check if event info is customized (not default values)
    const isDefaultEvent = currentEvent.name === "My Festival" && 
                           currentEvent.date === "TBD" && 
                           currentEvent.location === "TBD";
    
    return !isDefaultEvent;
  };

  const handleTemplateSelect = (templateId: string) => {
    if (hasCustomization()) {
      setPendingAction(templateId);
      setShowWarning(true);
    } else {
      onAutofill(templateId);
    }
  };

  const handleBaseChecklistSelect = () => {
    if (hasCustomization()) {
      setPendingAction('base');
      setShowWarning(true);
    } else {
      onLoadBaseChecklist();
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction === 'base') {
      onLoadBaseChecklist();
    } else if (pendingAction) {
      onAutofill(pendingAction);
    }
    setShowWarning(false);
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setShowWarning(false);
    setPendingAction(null);
  };

  return (
    <>
      <div className={`${className || ''}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Wand2 className="mr-2 h-4 w-4" />
              Autofill from Template
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Choose a Template</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Base Checklist Option */}
            <DropdownMenuItem 
              onClick={handleBaseChecklistSelect}
              className="cursor-pointer py-3 bg-blue-50 hover:bg-blue-100"
            >
              <div className="flex items-center gap-3 w-full">
                <ListRestart className="h-5 w-5 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-medium text-blue-900">Base Checklist</span>
                  <span className="text-xs text-blue-700">
                    Start fresh with essential festival items
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-gray-500">Festival Templates</DropdownMenuLabel>
            
            {sortedTemplates.map((template) => (
              <DropdownMenuItem 
                key={template.id} 
                onClick={() => handleTemplateSelect(template.id)}
                className="cursor-pointer py-3"
              >
                <div className="flex flex-col w-full">
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs text-gray-500">{template.event.location}</span>
                  <span className="text-xs text-gray-500">
                    {formatDateRange(template.event.startDate, template.event.endDate)}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {template.items.length} items
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Warning Dialog */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace existing checklist?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction === 'base' 
                ? "This will clear your current checklist and event info, replacing them with the base template. This action cannot be undone."
                : "Loading this template will add new items to your checklist and update your event information. Any customizations you've made will be preserved, but event details will be replaced."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAction}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {pendingAction === 'base' ? 'Clear & Load Base' : 'Load Template'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TemplateSelector;
