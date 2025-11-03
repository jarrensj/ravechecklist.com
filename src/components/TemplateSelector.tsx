
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Wand2, ChevronDown } from 'lucide-react';
import { templates } from '@/utils/data';
import { format } from 'date-fns';

interface TemplateSelectorProps {
  className?: string;
  onAutofill: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ className, onAutofill }) => {
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

  return (
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
          {sortedTemplates.map((template) => (
            <DropdownMenuItem 
              key={template.id} 
              onClick={() => onAutofill(template.id)}
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
  );
};

export default TemplateSelector;
