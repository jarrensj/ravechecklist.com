
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChecklistItem as IChecklistItem } from "@/utils/data";
import CategoryTag from './CategoryTag';
import { categories } from '@/utils/data';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChecklistItemProps {
  item: IChecklistItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle, onRemove }) => {
  const category = categories.find(c => c.id === item.category);
  
  return (
    <div className={cn(
      "flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md",
      "checklist-item",
      item.isCompleted ? "bg-gray-50 completed" : ""
    )}>
      <div className="flex items-center space-x-3">
        <Checkbox 
          id={`item-${item.id}`}
          checked={item.isCompleted}
          onCheckedChange={() => onToggle(item.id)}
        />
        <label 
          htmlFor={`item-${item.id}`}
          className={cn(
            "text-sm font-medium cursor-pointer",
            item.isCompleted ? "line-through text-gray-400" : ""
          )}
        >
          {item.text}
        </label>
      </div>
      
      <div className="flex items-center gap-2">
        {category && (
          <CategoryTag 
            name={category.name}
            colorClass={category.color}
          />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50"
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChecklistItem;
