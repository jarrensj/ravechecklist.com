
import { useState, useEffect } from 'react';
import { ChecklistItem, sampleChecklist } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";

export const useChecklist = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const { toast } = useToast();

  // Load checklist from localStorage on component mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem('mainChecklist');
    
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
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
      const updated = prev.map(item => 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
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

  const handleChangeCategory = (id: string, newCategory: string) => {
    const item = checklist.find(item => item.id === id);
    
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, category: newCategory } : item
    ));
    
    if (item) {
      toast({
        title: "Category changed",
        description: `${item.text} moved to new category`,
        duration: 2000,
      });
    }
  };
  
  const handleResetTemplate = () => {
    setChecklist(sampleChecklist);
    localStorage.setItem('mainChecklist', JSON.stringify(sampleChecklist));
    
    toast({
      title: "Template reset",
      description: "All items have been restored to their original state",
      duration: 2000,
    });
  };

  const progressPercentage = Math.round(
    checklist.length > 0 
      ? (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
      : 0
  );

  return {
    checklist,
    progressPercentage,
    handleToggleItem,
    handleAddItem,
    handleRemoveItem,
    handleChangeCategory,
    handleResetTemplate
  };
};
