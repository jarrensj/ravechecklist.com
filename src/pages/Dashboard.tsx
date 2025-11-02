
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import EventInfoCard from '@/components/EventInfoCard';
import { useChecklist } from '@/hooks/useChecklist';
import { useEventInfo } from '@/hooks/useEventInfo';
import { useTemplateHistory } from '@/hooks/useTemplateHistory';
import { useTemplateDetail } from '@/hooks/useTemplateDetail';
import TemplateSelector from '@/components/TemplateSelector';
import TemplatesSidebar from '@/components/TemplatesSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User } from 'lucide-react';
import { templates } from '@/utils/data';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = useParams<{ id?: string }>();
  const templateId = urlParams.id;
  
  // Track if we're showing a template from URL or history
  const [showingTemplate, setShowingTemplate] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lastViewedTemplate, addToHistory, refreshHistory } = useTemplateHistory();
  
  // Default user checklist (always available)
  const { 
    checklist: userChecklist, 
    progressPercentage: userProgress, 
    handleToggleItem: toggleUserItem, 
    handleAddItem: addUserItem, 
    handleRemoveItem: removeUserItem, 
    handleEditItem: editUserItem,
    handleResetTemplate: resetUserTemplate,
    handleToggleOutfitSubItem: toggleUserOutfitSubItem,
    handleAddOutfitSubItem: addUserOutfitSubItem,
    handleRemoveOutfitSubItem: removeUserOutfitSubItem,
    handleEditOutfitSubItem: editUserOutfitSubItem,
    hasChanges: userHasChanges
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
    handleResetTemplate: resetTemplateTemplate,
    handleToggleOutfitSubItem: toggleTemplateOutfitSubItem,
    handleAddOutfitSubItem: addTemplateOutfitSubItem,
    handleRemoveOutfitSubItem: removeTemplateOutfitSubItem,
    handleEditOutfitSubItem: editTemplateOutfitSubItem,
    hasChanges: templateHasChanges
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
  const handleToggleOutfitSubItem = showingTemplate ? toggleTemplateOutfitSubItem : toggleUserOutfitSubItem;
  const handleAddOutfitSubItem = showingTemplate ? addTemplateOutfitSubItem : addUserOutfitSubItem;
  const handleRemoveOutfitSubItem = showingTemplate ? removeTemplateOutfitSubItem : removeUserOutfitSubItem;
  const handleEditOutfitSubItem = showingTemplate ? editTemplateOutfitSubItem : editUserOutfitSubItem;
  const hasChanges = showingTemplate ? templateHasChanges : userHasChanges;
  
  // Use template event or user event
  const currentEvent = showingTemplate && template ? template.event : event;
  const currentEventName = showingTemplate && template ? template.event.name : event.name;
  
  // Handle switching to a specific template
  const switchToTemplate = (id: string) => {
    setSidebarOpen(false); // Close sidebar when selecting a template
    navigate(`/templates/${id}`);
  };
  
  // Handle going back to personal checklist
  const goToPersonalChecklist = () => {
    navigate('/checklist', { 
      state: { 
        showPersonalChecklist: true,
        fromTemplateId: template?.id
      } 
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Templates Sidebar */}
      <TemplatesSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onSelectTemplate={switchToTemplate}
        currentTemplateId={showingTemplate ? currentTemplateId : undefined}
      />
      
      {/* Main content area with margin for sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-16'}`}>
        <Header />
        
        <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {showingTemplate && template ? `${template.name}` : "My Festival Checklist"}
              </h1>
              {!showingTemplate && (
                <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                  <User className="mr-1 h-3 w-3" />
                  Personal
                </Badge>
              )}
              {showingTemplate && template && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Template
                </Badge>
              )}
            </div>
            {showingTemplate && template && (
              <p className="text-sm text-gray-600">
                Using template • <button onClick={goToPersonalChecklist} className="text-sky-600 hover:text-sky-800 underline">Switch to my personal checklist</button>
              </p>
            )}
            {!showingTemplate && (
              <p className="text-sm text-gray-600">
                <button onClick={() => setSidebarOpen(true)} className="text-sky-600 hover:text-sky-800 underline">Browse templates</button> or customize your own
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <TemplateSelector className="w-full sm:w-auto" />
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
              onToggleOutfitSubItem={handleToggleOutfitSubItem}
              onAddOutfitSubItem={handleAddOutfitSubItem}
              onRemoveOutfitSubItem={handleRemoveOutfitSubItem}
              onEditOutfitSubItem={handleEditOutfitSubItem}
              hasChanges={hasChanges}
            />
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
