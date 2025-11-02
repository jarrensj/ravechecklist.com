import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import ChecklistItem from './ChecklistItem';
import OutfitItem from './OutfitItem';
import CategoryTag from './CategoryTag';
import { ChecklistItem as IChecklistItem, categories } from '@/utils/data';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChecklistCardProps {
  items: IChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, category: string, isOutfit?: boolean) => void;
  onRemoveItem: (id: string) => void;
  onEditItem?: (id: string, text: string, category: string) => void;
  onResetTemplate?: () => void;
  eventName?: string;
  onToggleOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onAddOutfitSubItem?: (itemId: string, type: 'shoes' | 'top' | 'bottom' | 'accessories', text: string) => void;
  onRemoveOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onEditOutfitSubItem?: (itemId: string, subItemId: string, text: string) => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ 
  items, 
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onEditItem,
  onResetTemplate,
  eventName = "Festival",
  onToggleOutfitSubItem,
  onAddOutfitSubItem,
  onRemoveOutfitSubItem,
  onEditOutfitSubItem
}) => {
  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  
  const filteredItems = activeFilter 
    ? items.filter(item => item.category === activeFilter)
    : items;
    
  const handleAddItem = () => {
    if (newItemText.trim()) {
      const isOutfit = selectedCategory === 'outfits';
      onAddItem(newItemText, selectedCategory, isOutfit);
      setNewItemText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <Card className="w-full checklist-container">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <span className="text-lg sm:text-xl">{eventName} Checklist</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="remove-mode"
                      checked={isRemoveMode}
                      onCheckedChange={setIsRemoveMode}
                    />
                    <label htmlFor="remove-mode" className="text-xs sm:text-sm font-normal text-gray-500 cursor-pointer">
                      Edit mode
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle to remove items you don't want on your checklist anymore</p>
                </TooltipContent>
              </Tooltip>
              
              {isRemoveMode && onResetTemplate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-600 border-amber-600 hover:bg-amber-50"
                    >
                      <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                      <span className="text-xs sm:text-sm" onClick={onResetTemplate}>Reset Template</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Restore the original template items</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <span className="text-xs sm:text-sm font-normal text-gray-500">
              {items.filter(i => i.isCompleted).length} of {items.length} completed
            </span>
          </div>
        </CardTitle>
        <CardDescription>Keep track of all your festival essentials</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          <CategoryTag 
            name="All Items" 
            colorClass="bg-sky-100 text-sky-800"
            isSelected={activeFilter === null} 
            onClick={() => setActiveFilter(null)} 
          />
          {categories.map(category => (
            <CategoryTag 
              key={category.id}
              name={category.name} 
              colorClass={category.color}
              isSelected={activeFilter === category.id} 
              onClick={() => setActiveFilter(category.id)} 
            />
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input
            placeholder="Add new item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <div className="flex gap-2">
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm w-full sm:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Button 
            onClick={handleAddItem} 
            className="flex-shrink-0"
            disabled={!newItemText.trim()}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              item.isOutfit ? (
                <OutfitItem
                  key={item.id}
                  item={item}
                  onToggle={onToggleItem}
                  onRemove={onRemoveItem}
                  onEdit={onEditItem}
                  onToggleOutfitSubItem={onToggleOutfitSubItem}
                  onAddOutfitSubItem={onAddOutfitSubItem}
                  onRemoveOutfitSubItem={onRemoveOutfitSubItem}
                  onEditOutfitSubItem={onEditOutfitSubItem}
                  showRemoveButton={isRemoveMode}
                />
              ) : (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={onToggleItem}
                  onRemove={onRemoveItem}
                  onEdit={onEditItem}
                  showRemoveButton={isRemoveMode}
                />
              )
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              No items in this category yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistCard;
