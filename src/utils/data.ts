
export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  isCompleted: boolean;
}

export interface EventInfo {
  name: string;
  date: string;
  location: string;
  startTime: string;
}

export interface Template {
  id: string;
  name: string;
  event: EventInfo;
  items: ChecklistItem[];
  thumbnail: string;
}

export const categories = [
  { id: "documents", name: "Documents", color: "bg-blue-100 text-blue-800" },
  { id: "clothing", name: "Clothing", color: "bg-green-100 text-green-800" },
  { id: "electronics", name: "Electronics", color: "bg-purple-100 text-purple-800" },
  { id: "toiletries", name: "Toiletries", color: "bg-yellow-100 text-yellow-800" },
  { id: "misc", name: "Miscellaneous", color: "bg-gray-100 text-gray-800" }
];

export const sampleEvent: EventInfo = {
  name: "Coachella",
  date: "April 11-13 & 18-20, 2025",
  location: "Empire Polo Club, Indio, CA",
  startTime: "12:00 PM"
};

export const sampleChecklist: ChecklistItem[] = [
  { id: "1", text: "Festival Ticket/Wristband", category: "documents", isCompleted: false },
  { id: "2", text: "ID/Driver's License", category: "documents", isCompleted: false },
  { id: "3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
  { id: "4", text: "Festival Map & Schedule", category: "documents", isCompleted: false },
  { id: "8", text: "Bandanas/Masks", category: "clothing", isCompleted: false },
  { id: "9", text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
  { id: "11", text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
  { id: "13", text: "Earplugs", category: "clothing", isCompleted: false },
  { id: "17", text: "Sunscreen", category: "toiletries", isCompleted: false },
  { id: "18", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
  { id: "19", text: "Lip Balm", category: "toiletries", isCompleted: false },
  { id: "21", text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
  { id: "23", text: "Sunglasses", category: "clothing", isCompleted: false }
];

// Festival templates
export const templates: Template[] = [
  {
    id: "coachella",
    name: "Coachella Festival",
    event: sampleEvent,
    items: sampleChecklist,
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "outsidelands",
    name: "Outside Lands",
    event: {
      name: "Outside Lands",
      date: "August 9-11, 2024",
      location: "Golden Gate Park, San Francisco, CA",
      startTime: "11:00 AM"
    },
    items: [
      { id: "ol-1", text: "Festival Ticket/Wristband", category: "documents", isCompleted: false },
      { id: "ol-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "ol-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "ol-4", text: "Festival Map & Schedule", category: "documents", isCompleted: false },
      { id: "ol-5", text: "Warm Layers (SF Fog)", category: "clothing", isCompleted: false },
      { id: "ol-6", text: "Long Pants/Jeans", category: "clothing", isCompleted: false },
      { id: "ol-8", text: "Beanie/Hat", category: "clothing", isCompleted: false },
      { id: "ol-9", text: "Warm Jacket", category: "clothing", isCompleted: false },
      { id: "ol-11", text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
      { id: "ol-13", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "ol-17", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "ol-18", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
      { id: "ol-19", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "ol-20", text: "Blanket for Sitting", category: "misc", isCompleted: false },
      { id: "ol-21", text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
      { id: "ol-22", text: "Portable Hand Warmers", category: "misc", isCompleted: false },
      { id: "ol-23", text: "Sunglasses", category: "clothing", isCompleted: false }
    ],
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop"
  }
];
