import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import ChecklistItem from './ChecklistItem';
import OutfitItem from './OutfitItem';
import CategoryTag from './CategoryTag';
import { ChecklistItem as IChecklistItem, categories, CategoryId } from '@/utils/data';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChecklistCardProps {
  items: IChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, category: string, isOutfit?: boolean) => string;
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
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(categories[0].id);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [showOutfitDialog, setShowOutfitDialog] = useState(false);
  const [pendingClothingItem, setPendingClothingItem] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState("");
  const [newOutfitName, setNewOutfitName] = useState("");
  
  // Create flattened list for clothing filter - show sub-items as individual items
  const getFilteredItems = () => {
    if (!activeFilter) return items;
    
    if (activeFilter === 'clothing') {
      // For clothing, show outfit sub-items as individual items
      const clothingItems: any[] = [];
      items.forEach(item => {
        if (item.isOutfit && item.outfitItems && item.outfitItems.length > 0) {
          // Add each sub-item as if it were a regular item
          item.outfitItems.forEach(subItem => {
            clothingItems.push({
              id: subItem.id,
              text: subItem.text,
              category: 'clothing',
              isCompleted: subItem.isCompleted,
              isOutfit: false,
              parentOutfitId: item.id, // Track which outfit this belongs to
              subItemId: subItem.id
            });
          });
        }
      });
      return clothingItems;
    }
    
    // For other categories, normal filtering
    return items.filter(item => item.category === activeFilter);
  };
  
  const filteredItems = getFilteredItems();
  
  // Get all existing outfits
  const existingOutfits = items.filter(item => item.isOutfit);
    
  const handleAddItem = () => {
    if (newItemText.trim()) {
      // If adding clothing, show outfit selection dialog
      if (selectedCategory === 'clothing') {
        setPendingClothingItem(newItemText);
        setShowOutfitDialog(true);
      } else {
        const isOutfit = selectedCategory === 'outfits';
        onAddItem(newItemText, selectedCategory, isOutfit);
        setNewItemText("");
      }
    }
  };

  const handleConfirmOutfitSelection = () => {
    if (selectedOutfit === 'new' && newOutfitName.trim()) {
      // Create new outfit and add clothing to it
      const newOutfitId = onAddItem(newOutfitName, 'outfits', true);
      if (onAddOutfitSubItem && newOutfitId) {
        onAddOutfitSubItem(newOutfitId, 'top', pendingClothingItem);
      }
    } else if (selectedOutfit && onAddOutfitSubItem) {
      // Add to existing outfit
      onAddOutfitSubItem(selectedOutfit, 'top', pendingClothingItem);
    }
    
    // Reset and close
    setShowOutfitDialog(false);
    setNewItemText("");
    setPendingClothingItem("");
    setSelectedOutfit("");
    setNewOutfitName("");
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
              onChange={(e) => setSelectedCategory(e.target.value as CategoryId)}
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
            filteredItems.map(item => {
              // Handle flattened clothing items (from outfit sub-items)
              if ((item as any).parentOutfitId && (item as any).subItemId) {
                return (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    onToggle={(id) => {
                      // Toggle the sub-item within its parent outfit
                      if (onToggleOutfitSubItem) {
                        onToggleOutfitSubItem((item as any).parentOutfitId, (item as any).subItemId);
                      }
                    }}
                    onRemove={(id) => {
                      // Remove the sub-item from its parent outfit
                      if (onRemoveOutfitSubItem) {
                        onRemoveOutfitSubItem((item as any).parentOutfitId, (item as any).subItemId);
                      }
                    }}
                    onEdit={undefined} // Disable editing for flattened items
                    showRemoveButton={isRemoveMode}
                  />
                );
              }
              
              // Handle regular outfit items
              if (item.isOutfit) {
                return (
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
                );
              }
              
              // Handle regular checklist items
              return (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={onToggleItem}
                  onRemove={onRemoveItem}
                  onEdit={onEditItem}
                  showRemoveButton={isRemoveMode}
                />
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              No items in this category yet
            </div>
          )}
        </div>
      </CardContent>

      {/* Outfit Selection Dialog */}
      <Dialog open={showOutfitDialog} onOpenChange={setShowOutfitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Outfit</DialogTitle>
            <DialogDescription>
              Which outfit is this clothing item for?
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Item:</span> {pendingClothingItem}
              </p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Outfit</label>
              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedOutfit}
                onChange={(e) => {
                  setSelectedOutfit(e.target.value);
                  if (e.target.value !== 'new') {
                    setNewOutfitName("");
                  }
                }}
              >
                <option value="">Choose an outfit...</option>
                {existingOutfits.map(outfit => (
                  <option key={outfit.id} value={outfit.id}>
                    {outfit.text}
                  </option>
                ))}
                <option value="new">➕ Create New Outfit</option>
              </select>
            </div>
            
            {selectedOutfit === 'new' && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">New Outfit Name</label>
                <Input
                  placeholder="e.g., Day 1 Outfit, Saturday Night..."
                  value={newOutfitName}
                  onChange={(e) => setNewOutfitName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newOutfitName.trim()) {
                      handleConfirmOutfitSelection();
                    }
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowOutfitDialog(false);
                setNewItemText("");
                setPendingClothingItem("");
                setSelectedOutfit("");
                setNewOutfitName("");
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmOutfitSelection}
              disabled={!selectedOutfit || (selectedOutfit === 'new' && !newOutfitName.trim())}
            >
              Add to Outfit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChecklistCard;
