
import React from 'react';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import EventInfoCard from '@/components/EventInfoCard';
import { useChecklist } from '@/hooks/useChecklist';
import { useEventInfo } from '@/hooks/useEventInfo';
import TemplateSelector from '@/components/TemplateSelector';

const Dashboard: React.FC = () => {
  const { event, setEvent } = useEventInfo();

  const {
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
    handleLoadBaseChecklist,
    handleExportChecklist,
    handleImportChecklist
  } = useChecklist(setEvent, event);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">My Festival Checklist</h1>
            <p className="text-sm text-gray-600">
              Create your own custom checklist or autofill from a template
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <TemplateSelector 
              className="w-full sm:w-auto" 
              onAutofill={handleAutofillFromTemplate}
              onLoadBaseChecklist={handleLoadBaseChecklist}
              currentChecklist={checklist}
              currentEvent={event}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="md:col-span-1">
            <EventInfoCard 
              event={event} 
              setEvent={setEvent} 
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
              hasChanges={hasChanges}
              eventName={event.name}
              onToggleOutfitSubItem={handleToggleOutfitSubItem}
              onAddOutfitSubItem={handleAddOutfitSubItem}
              onRemoveOutfitSubItem={handleRemoveOutfitSubItem}
              onEditOutfitSubItem={handleEditOutfitSubItem}
              onExportChecklist={handleExportChecklist}
              onImportChecklist={handleImportChecklist}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
