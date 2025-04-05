
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChecklistItem as IChecklistItem } from "@/utils/data";
import CategoryTag from './CategoryTag';
import { categories } from '@/utils/data';
import { Trash2, Pencil } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ChecklistItemProps {
  item: IChecklistItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (id: string, text: string, category: string) => void;
  showRemoveButton: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ 
  item, 
  onToggle, 
  onRemove, 
  onEdit,
  showRemoveButton 
}) => {
  const category = categories.find(c => c.id === item.category);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [editedCategory, setEditedCategory] = useState(item.category);
  
  const handleEditClick = () => {
    setEditedText(item.text);
    setEditedCategory(item.category);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveEdit = () => {
    if (onEdit && editedText.trim()) {
      onEdit(item.id, editedText, editedCategory);
    }
    setIsEditDialogOpen(false);
  };
  
  return (
    <>
      <div 
        className={cn(
          "flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md",
          "checklist-item relative",
          item.isCompleted ? "bg-gray-50 completed" : ""
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
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
          
          {/* Action buttons visible on hover or in edit mode */}
          <div className={cn(
            "flex gap-1 transition-opacity duration-200", 
            (isHovering || showRemoveButton) ? "opacity-100" : "opacity-0"
          )}>
            {onEdit && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 p-1"
                onClick={handleEditClick}
                title="Edit item"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1"
              onClick={() => onRemove(item.id)}
              title="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="edit-item-text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Item text"
              />
            </div>
            <div className="grid gap-2">
              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChecklistItem;
