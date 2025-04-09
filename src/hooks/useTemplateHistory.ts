import { useState, useEffect } from 'react';
import { templates, Template } from '@/utils/data';

interface TemplateHistoryItem {
  id: string;
  name: string;
  timestamp: number;
}

export const useTemplateHistory = () => {
  const [history, setHistory] = useState<TemplateHistoryItem[]>([]);
  const [lastViewedTemplate, setLastViewedTemplate] = useState<Template | null>(null);
  
  // Load history from localStorage on component mount
  useEffect(() => {
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

  const addToHistory = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) return;
    
    setHistory(prev => {
      // Remove the template if it already exists in history
      const filteredHistory = prev.filter(item => item.id !== templateId);
      
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
      
      // Update lastViewedTemplate
      setLastViewedTemplate(template);
      
      return trimmedHistory;
    });
  };

  return {
    history,
    lastViewedTemplate,
    addToHistory
  };
};
