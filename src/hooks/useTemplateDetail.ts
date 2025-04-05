
import { useState, useEffect } from 'react';
import { templates, ChecklistItem } from '@/utils/data';
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

  const handleAddItem = (text: string, category: string) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      category,
      isCompleted: false
    };
    
    setChecklist(prev => [...prev, newItem]);
    
    toast({
      title: "Item added",
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
      item.id === id ? { ...item, text, category } : item
    ));
    
    toast({
      title: "Item updated",
      description: text,
      duration: 2000,
    });
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
  
  const progressPercentage = Math.round(
    (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
  );

  return {
    template,
    checklist,
    progressPercentage,
    handleToggleItem,
    handleAddItem,
    handleRemoveItem,
    handleEditItem,
    handleResetTemplate
  };
};
