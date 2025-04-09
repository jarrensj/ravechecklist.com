
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
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
import { templates } from '@/utils/data';

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = useParams<{ id?: string }>();
  const templateId = urlParams.id;
  
  // Track if we're showing a template from URL or history
  const [showingTemplate, setShowingTemplate] = useState(false);
  const { lastViewedTemplate, addToHistory, refreshHistory } = useTemplateHistory();
  
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
  
  // Template checklist (if we have a template ID from URL or from history)
  const currentTemplateId = templateId || (showingTemplate ? lastViewedTemplate?.id : undefined);
  
  const {
    template,
    checklist: templateChecklist,
    progressPercentage: templateProgress,
    handleToggleItem: toggleTemplateItem,
    handleAddItem: addTemplateItem,
    handleRemoveItem: removeTemplateItem,
    handleEditItem: editTemplateItem,
    handleResetTemplate: resetTemplateTemplate
  } = useTemplateDetail(currentTemplateId);
  
  const { event, setEvent } = useEventInfo();

  // Handle template navigation and history
  useEffect(() => {
    if (templateId) {
      setShowingTemplate(true);
      // Explicitly add to history whenever a template ID is in the URL
      addToHistory(templateId);
      // Force refresh the history after adding
      setTimeout(refreshHistory, 100);
    } else if (location.state?.showPersonalChecklist) {
      // When navigating back to personal checklist
      setShowingTemplate(false);
      
      // Important: We still want to update history if we came from a template
      if (location.state?.fromTemplateId) {
        addToHistory(location.state.fromTemplateId);
        // Force refresh after adding
        setTimeout(refreshHistory, 100);
      }
      
      // Clear the location state to avoid persisting this preference
      window.history.replaceState({}, document.title);
    } else if (lastViewedTemplate && template) {
      setShowingTemplate(true);
    }
  }, [location, lastViewedTemplate, template, templateId, addToHistory, refreshHistory]);

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
  
  // Handle switching to a specific template
  const switchToTemplate = (id: string) => {
    navigate(`/templates/${id}`);
  };
  
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
                onClick={() => navigate('/', { 
                  state: { 
                    showPersonalChecklist: true,
                    fromTemplateId: template.id  // Pass the current template ID when going back
                  } 
                })} 
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
