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
  { id: "1", text: "Festival Wristband", category: "documents", isCompleted: false },
  { id: "2", text: "ID/Driver's License", category: "documents", isCompleted: false },
  { id: "3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
  { id: "8", text: "Bandanas/Masks", category: "clothing", isCompleted: false },
  { id: "9", text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
  { id: "11", text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
  { id: "13", text: "Earplugs", category: "clothing", isCompleted: false },
  { id: "17", text: "Sunscreen", category: "toiletries", isCompleted: false },
  { id: "18", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
  { id: "19", text: "Lip Balm", category: "toiletries", isCompleted: false },
  { id: "21", text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
  { id: "23", text: "Sunglasses", category: "clothing", isCompleted: false },
  // Adding the new items
  { id: "24", text: "Camera", category: "electronics", isCompleted: false },
  { id: "25", text: "Eye Drops", category: "toiletries", isCompleted: false },
  { id: "26", text: "Handheld Fan", category: "electronics", isCompleted: false },
  { id: "27", text: "Fanny Pack", category: "clothing", isCompleted: false },
  { id: "28", text: "Make-up", category: "toiletries", isCompleted: false },
  { id: "29", text: "Water Mister (Personal Size)", category: "toiletries", isCompleted: false },
  { id: "30", text: "Bandaids", category: "toiletries", isCompleted: false },
  { id: "31", text: "Blanket (50\" x 70\" or smaller)", category: "misc", isCompleted: false }
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
      date: "Aug 8-10, 2025",
      location: "Golden Gate Park, San Francisco, CA",
      startTime: "11:00 AM"
    },
    items: [
      { id: "ol-1", text: "Festival Ticket/Wristband", category: "documents", isCompleted: false },
      { id: "ol-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "ol-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
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
  },
  {
    id: "hitc",
    name: "Head In The Clouds",
    event: {
      name: "Head In The Clouds",
      date: "May 31 - Jun 1, 2025",
      location: "Brookside at the Rose Bowl, Pasadena, CA",
      startTime: "1:00 PM"
    },
    items: [
      { id: "hitc-1", text: "Festival Wristband", category: "documents", isCompleted: false },
      { id: "hitc-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "hitc-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "hitc-4", text: "Portable Phone Charger", category: "electronics", isCompleted: false },
      { id: "hitc-5", text: "Comfortable Shoes", category: "clothing", isCompleted: false },
      { id: "hitc-6", text: "Shorts/Light Pants", category: "clothing", isCompleted: false },
      { id: "hitc-7", text: "T-Shirt/Tank Top", category: "clothing", isCompleted: false },
      { id: "hitc-8", text: "Light Jacket (for evening)", category: "clothing", isCompleted: false },
      { id: "hitc-9", text: "Sunglasses", category: "clothing", isCompleted: false },
      { id: "hitc-10", text: "Hat/Cap", category: "clothing", isCompleted: false },
      { id: "hitc-11", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "hitc-12", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
      { id: "hitc-13", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "hitc-14", text: "Deodorant", category: "toiletries", isCompleted: false },
      { id: "hitc-15", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "hitc-16", text: "Water Bottle", category: "misc", isCompleted: false },
      { id: "hitc-17", text: "Small Backpack/Fanny Pack", category: "clothing", isCompleted: false },
      { id: "hitc-18", text: "Portable Fan", category: "electronics", isCompleted: false },
      { id: "hitc-19", text: "Bandaids", category: "toiletries", isCompleted: false },
      { id: "hitc-20", text: "Blanket (50\" x 70\" or smaller)", category: "misc", isCompleted: false }
    ],
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2070&auto=format&fit=crop"
  }
];
