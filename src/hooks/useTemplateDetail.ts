
import { useState, useEffect } from 'react';
import { templates, ChecklistItem, OutfitSubItem } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";

export const useTemplateDetail = (templateId: string | undefined) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const { toast } = useToast();
  
  const template = templates.find(t => t.id === templateId);
  
  // Load checklist from localStorage on component mount
  useEffect(() => {
    if (template) {
      const storageKey = `template_${template.id}`;
      const savedChecklist = localStorage.getItem(storageKey);
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      } else {
        setChecklist(template.items);
      }
    }
  }, [template]);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (template && checklist.length > 0) {
      const storageKey = `template_${template.id}`;
      localStorage.setItem(storageKey, JSON.stringify(checklist));
    }
  }, [checklist, template]);
  
  const handleToggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
    
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
      outfitItems: isOutfit ? [] : undefined,
      isFavorite: false,
      lastEdited: Date.now()
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
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, text, category, lastEdited: Date.now() } : item
    ));
    
    toast({
      title: "Item updated",
      description: text,
      duration: 2000,
    });
  };

  const handleToggleFavorite = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isFavorite: !item.isFavorite, lastEdited: Date.now() } 
        : item
    ));
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      toast({
        title: item.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: item.text,
        duration: 2000,
      });
    }
  };

  const handleResetTemplate = () => {
    if (template) {
      setChecklist(template.items);
      const storageKey = `template_${template.id}`;
      localStorage.setItem(storageKey, JSON.stringify(template.items));
      
      toast({
        title: "Template reset",
        description: "All items have been restored to their original state",
        duration: 2000,
      });
    }
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

    toast({
      title: "Item updated",
      description: text,
      duration: 2000,
    });
  };
  
  const progressPercentage = Math.round(
    (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
  );

  // Sort checklist: favorites first, then by most recently edited
  const sortedChecklist = [...checklist].sort((a, b) => {
    // First, sort by favorite status
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    
    // Then sort by most recently edited
    const aTime = a.lastEdited || 0;
    const bTime = b.lastEdited || 0;
    return bTime - aTime;
  });

  return {
    template,
    checklist: sortedChecklist,
    progressPercentage,
    handleToggleItem,
    handleAddItem,
    handleRemoveItem,
    handleEditItem,
    handleResetTemplate,
    handleToggleOutfitSubItem,
    handleAddOutfitSubItem,
    handleRemoveOutfitSubItem,
    handleEditOutfitSubItem,
    handleToggleFavorite
  };
};
