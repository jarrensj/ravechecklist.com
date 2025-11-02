import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChecklistItem as IChecklistItem, OutfitSubItem } from "@/utils/data";
import CategoryTag from './CategoryTag';
import { categories } from '@/utils/data';
import { Trash2, Pencil, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface OutfitItemProps {
  item: IChecklistItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (id: string, text: string, category: string) => void;
  onToggleOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onAddOutfitSubItem?: (itemId: string, type: 'shoes' | 'top' | 'bottom' | 'accessories', text: string) => void;
  onRemoveOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onEditOutfitSubItem?: (itemId: string, subItemId: string, text: string) => void;
  showRemoveButton: boolean;
}

const OutfitItem: React.FC<OutfitItemProps> = ({ 
  item, 
  onToggle, 
  onRemove, 
  onEdit,
  onToggleOutfitSubItem,
  onAddOutfitSubItem,
  onRemoveOutfitSubItem,
  onEditOutfitSubItem,
  showRemoveButton 
}) => {
  const category = categories.find(c => c.id === item.category);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [editedCategory, setEditedCategory] = useState(item.category);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingSubItem, setIsAddingSubItem] = useState(false);
  const [newSubItemText, setNewSubItemText] = useState('');
  const [newSubItemType, setNewSubItemType] = useState<'shoes' | 'top' | 'bottom' | 'accessories'>('top');
  
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

  const handleAddSubItem = () => {
    if (onAddOutfitSubItem && newSubItemText.trim()) {
      onAddOutfitSubItem(item.id, newSubItemType, newSubItemText);
      setNewSubItemText('');
      setIsAddingSubItem(false);
    }
  };

  const outfitItems = item.outfitItems || [];
  const completedSubItems = outfitItems.filter(si => si.isCompleted).length;
  const totalSubItems = outfitItems.length;
  
  // Update main item completion based on sub-items
  // If there are no subitems, use the item's isCompleted state
  const allSubItemsCompleted = totalSubItems > 0 
    ? completedSubItems === totalSubItems 
    : item.isCompleted;
  
  return (
    <>
      <div 
        className={cn(
          "flex flex-col p-2 sm:p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md",
          "checklist-item relative",
          allSubItemsCompleted ? "bg-gray-50 completed" : ""
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 mr-2">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
            <Checkbox 
              id={`item-${item.id}`}
              checked={allSubItemsCompleted}
              onCheckedChange={() => onToggle(item.id)}
            />
            <label 
              htmlFor={`item-${item.id}`}
              className={cn(
                "text-xs sm:text-sm font-medium cursor-pointer truncate",
                allSubItemsCompleted ? "line-through text-gray-400" : ""
              )}
            >
              {item.text}
            </label>
            {totalSubItems > 0 && (
              <span className="text-xs text-gray-500">
                ({completedSubItems}/{totalSubItems})
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <div className={cn("flex transition-all duration-200", 
              (isHovering || showRemoveButton) ? "mr-[78px]" : "mr-0"
            )}>
              {category && (
                <CategoryTag 
                  name={category.name}
                  colorClass={category.color}
                />
              )}
            </div>
            
            <div className={cn(
              "flex gap-1 transition-all duration-200 absolute right-2 sm:right-3", 
              (isHovering || showRemoveButton) ? "opacity-100" : "opacity-0"
            )}>
              {onEdit && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400 hover:text-blue-500 hover:bg-blue-50 p-1"
                  onClick={handleEditClick}
                  title="Edit outfit"
                >
                  <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 sm:h-7 sm:w-7 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1"
                onClick={() => onRemove(item.id)}
                title="Remove outfit"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="mt-2 ml-7 space-y-1">
            {outfitItems.map(subItem => (
              <div key={subItem.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox 
                    id={`subitem-${subItem.id}`}
                    checked={subItem.isCompleted}
                    onCheckedChange={() => onToggleOutfitSubItem?.(item.id, subItem.id)}
                  />
                  <label 
                    htmlFor={`subitem-${subItem.id}`}
                    className={cn(
                      "text-xs font-medium cursor-pointer",
                      subItem.isCompleted ? "line-through text-gray-400" : ""
                    )}
                  >
                    <span className="text-gray-500 capitalize">{subItem.type}:</span> {subItem.text}
                  </label>
                </div>
                {showRemoveButton && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 text-gray-400 hover:text-red-500 hover:bg-red-50 p-0.5"
                    onClick={() => onRemoveOutfitSubItem?.(item.id, subItem.id)}
                    title="Remove item"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
            
            {isAddingSubItem ? (
              <div className="flex flex-col gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex gap-2">
                  <select 
                    className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs flex-shrink-0"
                    value={newSubItemType}
                    onChange={(e) => setNewSubItemType(e.target.value as 'shoes' | 'top' | 'bottom' | 'accessories')}
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <Input
                    placeholder="Item description..."
                    value={newSubItemText}
                    onChange={(e) => setNewSubItemText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddSubItem();
                      if (e.key === 'Escape') setIsAddingSubItem(false);
                    }}
                    className="h-8 text-xs flex-1"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsAddingSubItem(false)}
                    className="h-7 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleAddSubItem}
                    disabled={!newSubItemText.trim()}
                    className="h-7 text-xs"
                  >
                    Add
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAddingSubItem(true)}
                className="w-full h-8 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" /> Add Item
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Outfit</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="edit-item-text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Outfit name"
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

export default OutfitItem;
