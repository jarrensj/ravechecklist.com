
import { useState, useEffect } from 'react';
import { ChecklistItem, sampleChecklist, OutfitSubItem, templates, EventInfo, getBaseChecklist } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";
import { showUpdateToast } from '@/lib/utils';

export const useChecklist = (setEventInfo?: (event: EventInfo) => void) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const { toast } = useToast();

  // Load checklist from localStorage on component mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem('mainChecklist');
    
    if (savedChecklist) {
      const parsed = JSON.parse(savedChecklist);
      
      // Migration: Check if outfit item exists, if not, add it
      const hasOutfitItem = parsed.some((item: ChecklistItem) => item.isOutfit === true);
      
      if (!hasOutfitItem) {
        // Add the outfit item from the base checklist
        const outfitItem: ChecklistItem = {
          id: `${Date.now()}-outfit`,
          text: "Festival Outfit",
          category: "outfits",
          isCompleted: false,
          isOutfit: true,
          outfitItems: []
        };
        setChecklist([...parsed, outfitItem]);
      } else {
        setChecklist(parsed);
      }
    } else {
      setChecklist(sampleChecklist);
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem('mainChecklist', JSON.stringify(checklist));
    }
  }, [checklist]);

  const handleToggleItem = (id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          // If it's an outfit item with subitems, toggle all subitems
          if (item.isOutfit && item.outfitItems && item.outfitItems.length > 0) {
            // Check if all subitems are currently completed
            const allCompleted = item.outfitItems.every(subItem => subItem.isCompleted);
            // Toggle all subitems to the opposite state
            const newCompletionState = !allCompleted;
            
            return {
              ...item,
              isCompleted: newCompletionState,
              outfitItems: item.outfitItems.map(subItem => ({
                ...subItem,
                isCompleted: newCompletionState
              }))
            };
          }
          // For regular items, just toggle the item itself
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
      return updated;
    });
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      toast({
        title: item.isCompleted ? "Item unchecked" : "Item completed",
        description: item.text,
        duration: 2000,
      });
    }
  };

  const handleAddItem = (text: string, category: string, isOutfit: boolean = false) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      category,
      isCompleted: false,
      isOutfit,
      outfitItems: isOutfit ? [] : undefined
    };
    
    setChecklist(prev => [...prev, newItem]);
    
    toast({
      title: isOutfit ? "Outfit added" : "Item added",
      description: text,
      duration: 2000,
    });
  };
  
  const handleRemoveItem = (id: string) => {
    const itemToRemove = checklist.find(item => item.id === id);
    
    setChecklist(prev => prev.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: "Item removed",
        description: itemToRemove.text,
        duration: 2000,
      });
    }
  };
  
  const handleEditItem = (id: string, text: string, category: string) => {
    const originalItem = checklist.find(item => item.id === id);
    const hasChanges = originalItem && (originalItem.text !== text || originalItem.category !== category);
    
    setChecklist(prev => prev.map(item => 
      item.id === id 
        ? { ...item, text, category } 
        : item
    ));
    
    showUpdateToast(toast, !!hasChanges, {
      changedTitle: "Item updated",
      changedDescription: text,
    });
  };
  
  const handleResetTemplate = () => {
    setChecklist(sampleChecklist);
    localStorage.setItem('mainChecklist', JSON.stringify(sampleChecklist));
    
    toast({
      title: "Checklist reset",
      description: "All items have been reset back to the original checklist template",
      duration: 2000,
    });
  };

  const handleToggleOutfitSubItem = (itemId: string, subItemId: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === itemId && item.outfitItems) {
        return {
          ...item,
          outfitItems: item.outfitItems.map(subItem =>
            subItem.id === subItemId ? { ...subItem, isCompleted: !subItem.isCompleted } : subItem
          )
        };
      }
      return item;
    }));
  };

  const handleAddOutfitSubItem = (itemId: string, type: 'shoes' | 'top' | 'bottom' | 'accessories', text: string) => {
    const newSubItem: OutfitSubItem = {
      id: `${itemId}-${Date.now()}`,
      type,
      text,
      isCompleted: false
    };

    setChecklist(prev => prev.map(item => {
      if (item.id === itemId && item.outfitItems) {
        return {
          ...item,
          outfitItems: [...item.outfitItems, newSubItem]
        };
      }
      return item;
    }));

    toast({
      title: "Item added to outfit",
      description: `${type}: ${text}`,
      duration: 2000,
    });
  };

  const handleRemoveOutfitSubItem = (itemId: string, subItemId: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === itemId && item.outfitItems) {
        return {
          ...item,
          outfitItems: item.outfitItems.filter(subItem => subItem.id !== subItemId)
        };
      }
      return item;
    }));

    toast({
      title: "Item removed from outfit",
      duration: 2000,
    });
  };

  const handleEditOutfitSubItem = (itemId: string, subItemId: string, text: string) => {
    const item = checklist.find(i => i.id === itemId);
    const originalSubItem = item?.outfitItems?.find(subItem => subItem.id === subItemId);
    const hasChanges = originalSubItem && originalSubItem.text !== text;
    
    setChecklist(prev => prev.map(item => {
      if (item.id === itemId && item.outfitItems) {
        return {
          ...item,
          outfitItems: item.outfitItems.map(subItem =>
            subItem.id === subItemId ? { ...subItem, text } : subItem
          )
        };
      }
      return item;
    }));

    showUpdateToast(toast, !!hasChanges, {
      changedTitle: "Item updated",
      changedDescription: text,
    });
  };

  const handleAutofillFromTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      toast({
        title: "Template not found",
        description: "Could not load the selected template",
        duration: 2000,
        variant: "destructive"
      });
      return;
    }
    
    // Update event information
    if (setEventInfo) {
      setEventInfo(template.event);
    }
    
    // Get existing item texts to avoid duplicates
    const existingItemTexts = new Set(checklist.map(item => item.text.toLowerCase()));
    
    // Filter out items that already exist in the checklist
    const newItems = template.items.filter(
      item => !existingItemTexts.has(item.text.toLowerCase())
    );
    
    if (newItems.length === 0) {
      toast({
        title: "Template loaded",
        description: `Event info updated. All items from ${template.name} were already in your checklist.`,
        duration: 3000,
      });
      return;
    }
    
    // Add new items to checklist with fresh IDs
    const itemsToAdd = newItems.map(item => ({
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCompleted: false,
      outfitItems: item.outfitItems?.map(subItem => ({
        ...subItem,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        isCompleted: false
      }))
    }));
    
    setChecklist(prev => [...prev, ...itemsToAdd]);
    
    toast({
      title: "Template loaded successfully",
      description: `Added ${newItems.length} new item${newItems.length > 1 ? 's' : ''} and updated event info for ${template.name}`,
      duration: 3000,
    });
  };

  const handleLoadBaseChecklist = () => {
    const baseChecklist = getBaseChecklist();
    setChecklist(baseChecklist);
    localStorage.setItem('mainChecklist', JSON.stringify(baseChecklist));
    
    // Reset event info to default
    if (setEventInfo) {
      const defaultEvent: EventInfo = {
        name: "My Festival",
        date: "TBD",
        location: "TBD",
        startTime: "TBD"
      };
      setEventInfo(defaultEvent);
    }
    
    toast({
      title: "Base checklist loaded",
      description: "Checklist and event info have been reset to base defaults",
      duration: 3000,
    });
  };

  const progressPercentage = Math.round(
    checklist.length > 0 
      ? (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
      : 0
  );

  // Check if there are changes from the base checklist
  const hasChanges = (() => {
    if (checklist.length !== sampleChecklist.length) return true;
    
    // Create normalized versions for comparison (ignore IDs and completion status)
    const normalizeItem = (item: ChecklistItem) => ({
      text: item.text.toLowerCase().trim(),
      category: item.category,
      isOutfit: item.isOutfit || false,
      outfitItemsCount: item.outfitItems?.length || 0
    });
    
    const currentNormalized = checklist.map(normalizeItem).sort((a, b) => a.text.localeCompare(b.text));
    const baseNormalized = sampleChecklist.map(normalizeItem).sort((a, b) => a.text.localeCompare(b.text));
    
    // Compare each item
    for (let i = 0; i < currentNormalized.length; i++) {
      const current = currentNormalized[i];
      const base = baseNormalized[i];
      
      if (
        current.text !== base.text ||
        current.category !== base.category ||
        current.isOutfit !== base.isOutfit
      ) {
        return true;
      }
    }
    
    return false;
  })();

  return {
    checklist,
    progressPercentage,
    hasChanges,
    handleToggleItem,
    handleAddItem,
    handleRemoveItem,
    handleEditItem,
    handleResetTemplate,
    handleToggleOutfitSubItem,
    handleAddOutfitSubItem,
    handleRemoveOutfitSubItem,
    handleEditOutfitSubItem,
    handleAutofillFromTemplate,
    handleLoadBaseChecklist
  };
};
