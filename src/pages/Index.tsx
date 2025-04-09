
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import EventInfoCard from '@/components/EventInfoCard';
import { useChecklist } from '@/hooks/useChecklist';
import { useEventInfo } from '@/hooks/useEventInfo';
import { useTemplateHistory } from '@/hooks/useTemplateHistory';
import { useTemplateDetail } from '@/hooks/useTemplateDetail';
import TemplateSelector from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Index: React.FC = () => {
  const location = useLocation();
  const [showingTemplate, setShowingTemplate] = useState(false);
  const { lastViewedTemplate } = useTemplateHistory();
  
  // Default user checklist (always available)
  const { 
    checklist: userChecklist, 
    progressPercentage: userProgress, 
    handleToggleItem: toggleUserItem, 
    handleAddItem: addUserItem, 
    handleRemoveItem: removeUserItem, 
    handleEditItem: editUserItem,
    handleResetTemplate: resetUserTemplate 
  } = useChecklist();
  
  // Template checklist (if we have a last viewed template)
  const {
    template,
    checklist: templateChecklist,
    progressPercentage: templateProgress,
    handleToggleItem: toggleTemplateItem,
    handleAddItem: addTemplateItem,
    handleRemoveItem: removeTemplateItem,
    handleEditItem: editTemplateItem,
    handleResetTemplate: resetTemplateTemplate
  } = useTemplateDetail(lastViewedTemplate?.id);
  
  const { event, setEvent } = useEventInfo();

  // Check if we should force showing the personal checklist
  useEffect(() => {
    if (location.state?.showPersonalChecklist) {
      setShowingTemplate(false);
    } else if (lastViewedTemplate && template) {
      setShowingTemplate(true);
    }
  }, [location, lastViewedTemplate, template]);

  // Use either template or user checklist based on state
  const checklist = showingTemplate ? templateChecklist : userChecklist;
  const progressPercentage = showingTemplate ? templateProgress : userProgress;
  const handleToggleItem = showingTemplate ? toggleTemplateItem : toggleUserItem;
  const handleAddItem = showingTemplate ? addTemplateItem : addUserItem;
  const handleRemoveItem = showingTemplate ? removeTemplateItem : removeUserItem;
  const handleEditItem = showingTemplate ? editTemplateItem : editUserItem;
  const handleResetTemplate = showingTemplate ? resetTemplateTemplate : resetUserTemplate;
  
  // Use template event or user event
  const currentEvent = showingTemplate && template ? template.event : event;
  const currentEventName = showingTemplate && template ? template.event.name : event.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            {showingTemplate && template ? `${template.name} Template` : "My Festival Checklist"}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {showingTemplate && template && (
              <Button 
                variant="outline" 
                onClick={() => setShowingTemplate(false)} 
                className="mb-2 sm:mb-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Checklist
              </Button>
            )}
            <TemplateSelector className={showingTemplate ? "w-full sm:w-auto" : ""} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="md:col-span-1">
            <EventInfoCard 
              event={currentEvent} 
              setEvent={showingTemplate ? () => {} : setEvent} 
              progressPercentage={progressPercentage} 
            />
          </div>
          
          <div className="md:col-span-2">
            <ChecklistCard 
              items={checklist}
              onToggleItem={handleToggleItem}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onEditItem={handleEditItem}
              onResetTemplate={handleResetTemplate}
              eventName={currentEventName}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
