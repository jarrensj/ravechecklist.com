import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, RotateCcw, Download, Upload } from "lucide-react";
import ChecklistItem from './ChecklistItem';
import OutfitItem from './OutfitItem';
import CategoryTag from './CategoryTag';
import { ChecklistItem as IChecklistItem, categories } from '@/utils/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChecklistCardProps {
  items: IChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, category: string, isOutfit?: boolean) => void;
  onRemoveItem: (id: string) => void;
  onEditItem?: (id: string, text: string, category: string) => void;
  onResetTemplate?: () => void;
  hasChanges?: boolean;
  eventName?: string;
  onToggleOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onAddOutfitSubItem?: (itemId: string, type: 'shoes' | 'top' | 'bottom' | 'accessories', text: string) => void;
  onRemoveOutfitSubItem?: (itemId: string, subItemId: string) => void;
  onEditOutfitSubItem?: (itemId: string, subItemId: string, text: string) => void;
  onExportChecklist?: () => Promise<string>;
  onImportChecklist?: (json?: string) => Promise<boolean>;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onEditItem,
  onResetTemplate,
  hasChanges = false,
  eventName = "Festival",
  onToggleOutfitSubItem,
  onAddOutfitSubItem,
  onRemoveOutfitSubItem,
  onEditOutfitSubItem,
  onExportChecklist,
  onImportChecklist
}) => {
  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");
  
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

  const handleExport = async () => {
    if (onExportChecklist) {
      await onExportChecklist();
    }
  };

  const handleImportFromClipboard = async () => {
    if (onImportChecklist) {
      const success = await onImportChecklist();
      if (success) {
        setImportDialogOpen(false);
      }
    }
  };

  const handleImportFromText = async () => {
    if (onImportChecklist && importText.trim()) {
      const success = await onImportChecklist(importText.trim());
      if (success) {
        setImportText("");
        setImportDialogOpen(false);
      }
    }
  };

  return (
    <Card className="w-full checklist-container">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <span className="text-lg sm:text-xl">{eventName} Checklist</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {onExportChecklist && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    className="text-blue-600 border-blue-600 hover:bg-blue-600/10 dark:text-blue-400 dark:border-blue-400"
                  >
                    <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="text-xs sm:text-sm">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export checklist to clipboard (compatible with mobile app)</p>
                </TooltipContent>
              </Tooltip>
            )}
            {onImportChecklist && (
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-600/10 dark:text-green-400 dark:border-green-400"
                      >
                        <Upload className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="text-xs sm:text-sm">Import</span>
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Import checklist from mobile app</p>
                  </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Import Checklist</DialogTitle>
                    <DialogDescription>
                      Import a checklist from the RaveChecklist mobile app. This will replace your current checklist.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleImportFromClipboard}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import from Clipboard
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or paste JSON manually
                        </span>
                      </div>
                    </div>
                    <Textarea
                      placeholder='Paste your exported checklist JSON here...'
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      className="min-h-[150px] font-mono text-sm"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImportText("");
                        setImportDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleImportFromText}
                      disabled={!importText.trim()}
                    >
                      Import
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {onResetTemplate && hasChanges && (
              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 border-amber-600 hover:bg-amber-600/10 dark:text-amber-400 dark:border-amber-400"
                      >
                        <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="text-xs sm:text-sm">Reset</span>
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset back to the base checklist</p>
                  </TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Checklist?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your custom items and progress. You will lose everything and go back to the base checklist. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onResetTemplate}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
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
            colorClass="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
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
                  showRemoveButton={true}
                />
              ) : (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={onToggleItem}
                  onRemove={onRemoveItem}
                  onEdit={onEditItem}
                  showRemoveButton={true}
                />
              )
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No items in this category yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistCard;
