
import { useState, useEffect } from 'react';
import { EventInfo, sampleEvent } from '@/utils/data';

export const useEventInfo = () => {
  const [event, setEvent] = useState<EventInfo>(sampleEvent);
  
  // Load event from localStorage on component mount
  useEffect(() => {
    const savedEvent = localStorage.getItem('eventInfo');
    
    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
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
