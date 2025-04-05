
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { useTemplateDetail } from '@/hooks/useTemplateDetail';
import TemplateNotFound from '@/components/TemplateNotFound';
import TemplateHeader from '@/components/TemplateHeader';
import EventInfoCard from '@/components/EventInfoCard';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
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
  
  if (!template) {
    return <TemplateNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <TemplateHeader name={template.name} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
