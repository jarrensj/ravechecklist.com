
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { useTemplateDetail } from '@/hooks/useTemplateDetail';
import TemplateNotFound from '@/components/TemplateNotFound';
import TemplateHeader from '@/components/TemplateHeader';
import EventInfoCard from '@/components/EventInfoCard';
import { useTemplateHistory } from '@/hooks/useTemplateHistory';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TemplateSelector from '@/components/TemplateSelector';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToHistory, refreshHistory } = useTemplateHistory();
  const navigate = useNavigate();
  
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
      // Force refresh the history after adding
      setTimeout(refreshHistory, 100);
    }
  }, [id, template, addToHistory, refreshHistory]);
  
  if (!template) {
    return <TemplateNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            {template.name} Template
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard', { state: { showPersonalChecklist: true } })} 
              className="mb-2 sm:mb-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Checklist
            </Button>
            <TemplateSelector className="w-full sm:w-auto" />
          </div>
        </div>
        
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
