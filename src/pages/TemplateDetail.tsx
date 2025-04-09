
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { useTemplateDetail } from '@/hooks/useTemplateDetail';
import TemplateNotFound from '@/components/TemplateNotFound';
import TemplateHeader from '@/components/TemplateHeader';
import EventInfoCard from '@/components/EventInfoCard';
import { useTemplateHistory } from '@/hooks/useTemplateHistory';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToHistory } = useTemplateHistory();
  
  const {
    template,
    checklist,
    progressPercentage,
    handleToggleItem,
    handleAddItem,
    handleRemoveItem,
    handleEditItem,
    handleResetTemplate
  } = useTemplateDetail(id);
  
  // Record this template view in history
  useEffect(() => {
    if (id && template) {
      addToHistory(id);
    }
  }, [id, template, addToHistory]);
  
  if (!template) {
    return <TemplateNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <TemplateHeader name={template.name} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="md:col-span-1">
            <EventInfoCard 
              event={template.event}
              setEvent={() => {}} // This is read-only in template detail
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
              eventName={template.event.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateDetail;
