
import React, { useState, KeyboardEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Music, AlertTriangle, Pencil, Save } from "lucide-react";
import { EventInfo } from '@/utils/data';
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface EventInfoCardProps {
  event: EventInfo;
  setEvent: React.Dispatch<React.SetStateAction<EventInfo>>;
  progressPercentage: number;
}

const EventInfoCard: React.FC<EventInfoCardProps> = ({ event, setEvent, progressPercentage }) => {
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventInfo>(event);
  const { toast } = useToast();

  const saveEventChanges = () => {
    setEvent(editedEvent);
    setIsEditingEvent(false);
    toast({
      title: "Event updated",
      description: "Event details have been saved",
      duration: 2000,
    });
  };
  
  const toggleEditEvent = () => {
    if (isEditingEvent) {
      // Save changes
      saveEventChanges();
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
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEventChanges();
    }
  };

  return (
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
  );
};

export default EventInfoCard;
