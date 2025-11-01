
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown } from 'lucide-react';
import { useTemplateHistory } from '@/hooks/useTemplateHistory';
import { formatDistanceToNow } from 'date-fns';

interface TemplateSelectorProps {
  className?: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ className }) => {
  const { history, refreshHistory } = useTemplateHistory();
  const navigate = useNavigate();

  // Ensure history is refreshed when the component mounts and becomes visible
  useEffect(() => {
    // Force refresh history when component mounts or becomes visible
    refreshHistory();
    
    // Set up an interval to refresh history data
    const intervalId = setInterval(() => {
      refreshHistory();
    }, 1000); // Refresh every second while dropdown might be open
    
    return () => clearInterval(intervalId);
  }, [refreshHistory]);

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/templates/${templateId}`);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className={`${className || ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <Clock className="mr-2 h-4 w-4" />
            Recent Templates
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Recently Viewed</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {history.map((item) => (
            <DropdownMenuItem 
              key={item.id} 
              onClick={() => handleSelectTemplate(item.id)}
              className="cursor-pointer"
            >
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
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
