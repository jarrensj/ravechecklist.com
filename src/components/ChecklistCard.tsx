
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ChecklistItem from './ChecklistItem';
import CategoryTag from './CategoryTag';
import { ChecklistItem as IChecklistItem, categories } from '@/utils/data';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChecklistCardProps {
  items: IChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, category: string) => void;
  onRemoveItem: (id: string) => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ 
  items, 
  onToggleItem,
  onAddItem,
  onRemoveItem
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
      onAddItem(newItemText, selectedCategory);
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
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Rave Checklist</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="remove-mode"
                      checked={isRemoveMode}
                      onCheckedChange={setIsRemoveMode}
                    />
                    <label htmlFor="remove-mode" className="text-sm font-normal text-gray-500 cursor-pointer">
                      Edit mode
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle to remove items you don't want on your checklist anymore</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-sm font-normal text-gray-500">
              {items.filter(i => i.isCompleted).length} of {items.length} completed
            </span>
          </div>
        </CardTitle>
        <CardDescription>Keep track of all your rave essentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
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
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add new item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <div className="flex-shrink-0">
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddItem} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={onToggleItem}
                onRemove={onRemoveItem}
                showRemoveButton={isRemoveMode}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No items in this category yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistCard;
