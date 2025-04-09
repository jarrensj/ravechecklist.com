
import React from 'react';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import EventInfoCard from '@/components/EventInfoCard';
import { useChecklist } from '@/hooks/useChecklist';
import { useEventInfo } from '@/hooks/useEventInfo';

const Index: React.FC = () => {
  const { 
    checklist, 
    progressPercentage, 
    handleToggleItem, 
    handleAddItem, 
    handleRemoveItem, 
    handleEditItem,
    handleResetTemplate 
  } = useChecklist();
  
  const { event, setEvent } = useEventInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              eventName={event.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
