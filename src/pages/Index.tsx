
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Music, AlertTriangle, Pencil, Save } from "lucide-react";
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { sampleChecklist, sampleEvent, ChecklistItem, EventInfo } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Index: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [event, setEvent] = useState<EventInfo>(sampleEvent);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventInfo>(sampleEvent);
  const { toast } = useToast();

  // Load checklist and event from localStorage on component mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem('mainChecklist');
    const savedEvent = localStorage.getItem('eventInfo');
    
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    } else {
      setChecklist(sampleChecklist);
    }
    
    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
      setEditedEvent(JSON.parse(savedEvent));
    }
  }, []);

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem('mainChecklist', JSON.stringify(checklist));
    }
  }, [checklist]);
  
  // Save event to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eventInfo', JSON.stringify(event));
  }, [event]);

  const handleToggleItem = (id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      return updated;
    });
    
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
  
  const handleResetTemplate = () => {
    setChecklist(sampleChecklist);
    localStorage.setItem('mainChecklist', JSON.stringify(sampleChecklist));
    
    toast({
      title: "Template reset",
      description: "All items have been restored to their original state",
      duration: 2000,
    });
  };
  
  const toggleEditEvent = () => {
    if (isEditingEvent) {
      // Save changes
      setEvent(editedEvent);
      toast({
        title: "Event updated",
        description: "Event details have been saved",
        duration: 2000,
      });
    } else {
      // Start editing
      setEditedEvent({...event});
    }
    setIsEditingEvent(!isEditingEvent);
  };
  
  const handleEventChange = (field: keyof EventInfo, value: string) => {
    setEditedEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const progressPercentage = Math.round(
    (checklist.filter(item => item.isCompleted).length / checklist.length) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Event Information
                  <button 
                    onClick={toggleEditEvent}
                    className="text-sky-600 hover:text-sky-700 p-1 rounded transition-colors"
                    aria-label={isEditingEvent ? "Save event details" : "Edit event details"}
                  >
                    {isEditingEvent ? <Save size={18} /> : <Pencil size={18} />}
                  </button>
                </CardTitle>
                <CardDescription>Your festival details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Music className="h-5 w-5 mr-3 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      {isEditingEvent ? (
                        <Input 
                          value={editedEvent.name}
                          onChange={(e) => handleEventChange('name', e.target.value)}
                          className="mb-1"
                        />
                      ) : (
                        <p className="text-lg font-medium">{event.name}</p>
                      )}
                      <p className="text-sm text-gray-500">Festival Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      {isEditingEvent ? (
                        <Input 
                          value={editedEvent.date}
                          onChange={(e) => handleEventChange('date', e.target.value)}
                          className="mb-1"
                        />
                      ) : (
                        <p className="text-lg font-medium">{event.date}</p>
                      )}
                      <p className="text-sm text-gray-500">Event Dates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      {isEditingEvent ? (
                        <Input 
                          value={editedEvent.location}
                          onChange={(e) => handleEventChange('location', e.target.value)}
                          className="mb-1"
                        />
                      ) : (
                        <p className="text-lg font-medium">{event.location}</p>
                      )}
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      {isEditingEvent ? (
                        <Input 
                          value={editedEvent.startTime}
                          onChange={(e) => handleEventChange('startTime', e.target.value)}
                          className="mb-1"
                        />
                      ) : (
                        <p className="text-lg font-medium">{event.startTime}</p>
                      )}
                      <p className="text-sm text-gray-500">Gates Open</p>
                    </div>
                  </div>

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
