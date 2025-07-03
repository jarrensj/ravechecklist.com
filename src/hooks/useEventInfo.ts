
import { useState, useEffect } from 'react';
import { EventInfo } from '@/utils/data';

const defaultEvent: EventInfo = {
  name: "My Festival",
  date: "TBD",
  location: "TBD",
  startTime: "TBD"
};

export const useEventInfo = () => {
  const [event, setEvent] = useState<EventInfo>(defaultEvent);

  // Load event info from localStorage on component mount
  useEffect(() => {
    const savedEvent = localStorage.getItem('eventInfo');
    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
    }
  }, []);

  // Save event info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eventInfo', JSON.stringify(event));
  }, [event]);

  return { event, setEvent };
};
