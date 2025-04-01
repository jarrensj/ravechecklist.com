import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, PlaneTakeoff } from "lucide-react";
import Header from '@/components/Header';
import ChecklistCard from '@/components/ChecklistCard';
import { sampleChecklist, sampleTrip, ChecklistItem } from '@/utils/data';
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(sampleChecklist);
  const { toast } = useToast();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Upcoming Trip</CardTitle>
                <CardDescription>Your flight details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <PlaneTakeoff className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{sampleTrip.destination}</p>
                      <p className="text-sm text-gray-500">Destination</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{sampleTrip.date}</p>
                      <p className="text-sm text-gray-500">Departure Date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-sky-600" />
                    <div>
                      <p className="text-lg font-medium">{sampleTrip.departureTime}</p>
                      <p className="text-sm text-gray-500">Departure Time</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="font-medium">Flight {sampleTrip.flightNumber}</p>
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
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
