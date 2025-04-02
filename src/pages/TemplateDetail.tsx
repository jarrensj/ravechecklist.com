
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Music, ArrowLeft, AlertTriangle } from "lucide-react";
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { templates, ChecklistItem } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Template Not Found</CardTitle>
            <CardDescription>The template you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/templates')} className="w-full">
              Back to Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>(template.items);
  
  const handleToggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      toast({
        title: item.isCompleted ? "Item unchecked" : "Item completed",
        description: item.text,
        duration: 2000,
      });
    }
  };

  const handleAddItem = (text: string, category: string) => {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      category,
      isCompleted: false
    };
    
    setChecklist(prev => [...prev, newItem]);
    
    toast({
      title: "Item added",
      description: text,
      duration: 2000,
    });
  };
  
  const handleRemoveItem = (id: string) => {
    const itemToRemove = checklist.find(item => item.id === id);
    
    setChecklist(prev => prev.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: "Item removed",
        description: itemToRemove.text,
        duration: 2000,
      });
    }
  };
  
  const progressPercentage = Math.round(
    (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/templates')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
          </Button>
          
          <h1 className="text-3xl font-bold">{template.name} Checklist</h1>
          <p className="text-gray-600">Customize this template for your festival trip</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Your festival details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Music className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{template.event.name}</p>
                      <p className="text-sm text-gray-500">Festival Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{template.event.date}</p>
                      <p className="text-sm text-gray-500">Event Dates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{template.event.location}</p>
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{template.event.startTime}</p>
                      <p className="text-sm text-gray-500">Gates Open</p>
                    </div>
                  </div>

                  {template.id === "coachella" && (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-3 text-amber-600" />
                      <div>
                        <a 
                          href="https://www.coachella.com/faq" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-amber-600 hover:underline"
                        >
                          Check Prohibited Items
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t">
                    <p className="font-medium">Packing Progress</p>
                    <div className="mt-3">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-sky-500 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {progressPercentage}% packed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <ChecklistCard 
              items={checklist}
              onToggleItem={handleToggleItem}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              eventName={template.event.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateDetail;
