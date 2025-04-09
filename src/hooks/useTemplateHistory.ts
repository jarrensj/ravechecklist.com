import { useState, useEffect, useCallback } from 'react';
import { templates, Template } from '@/utils/data';

interface TemplateHistoryItem {
  id: string;
  name: string;
  timestamp: number;
}

export const useTemplateHistory = () => {
  const [history, setHistory] = useState<TemplateHistoryItem[]>([]);
  const [lastViewedTemplate, setLastViewedTemplate] = useState<Template | null>(null);
  
  // Function to load history from localStorage
  const refreshHistory = useCallback(() => {
    const savedHistory = localStorage.getItem('templateViewHistory');
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory) as TemplateHistoryItem[];
      setHistory(parsedHistory);
      
      // Set the last viewed template
      const lastTemplate = parsedHistory[0];
      if (lastTemplate) {
        const templateData = templates.find(t => t.id === lastTemplate.id);
        if (templateData) {
          setLastViewedTemplate(templateData);
        }
      }
    }
  }, []);
  
  // Load history from localStorage on component mount
  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const addToHistory = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) return;
    
    // Get current history from localStorage to ensure we're working with the latest data
    const savedHistory = localStorage.getItem('templateViewHistory');
    let currentHistory: TemplateHistoryItem[] = [];
    
    if (savedHistory) {
      currentHistory = JSON.parse(savedHistory);
    }
    
    // Remove the template if it already exists in history
    const filteredHistory = currentHistory.filter(item => item.id !== templateId);
    
    // Add the template to the beginning of the array
    const newHistory = [
      {
        id: templateId,
        name: template.name,
        timestamp: Date.now()
      },
      ...filteredHistory
    ];
    
    // Keep only the 10 most recent templates
    const trimmedHistory = newHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('templateViewHistory', JSON.stringify(trimmedHistory));
    
    // Update state
    setHistory(trimmedHistory);
    setLastViewedTemplate(template);
    
    return template;
  }, []);

  return {
    history,
    lastViewedTemplate,
    addToHistory,
    refreshHistory
  };
};
