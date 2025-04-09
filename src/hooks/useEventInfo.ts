
import { useState, useEffect } from 'react';
import { EventInfo, sampleEvent } from '@/utils/data';

export const useEventInfo = () => {
  const [event, setEvent] = useState<EventInfo>(sampleEvent);
  
  // Load event from localStorage on component mount
  useEffect(() => {
    const savedEvent = localStorage.getItem('eventInfo');
    
    if (savedEvent) {
      try {
        const parsedEvent = JSON.parse(savedEvent);
        
        // Convert date strings back to Date objects if they exist
        if (parsedEvent.startDate) {
          parsedEvent.startDate = new Date(parsedEvent.startDate);
        }
        if (parsedEvent.endDate) {
          parsedEvent.endDate = new Date(parsedEvent.endDate);
        }
        
        setEvent(parsedEvent);
      } catch (error) {
        console.error("Failed to parse saved event:", error);
        setEvent(sampleEvent);
      }
    }
  }, []);
  
  // Save event to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eventInfo', JSON.stringify(event));
  }, [event]);

  return {
    event,
    setEvent
  };
};
