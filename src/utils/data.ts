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
  startDate?: Date; // New field for sorting
  endDate?: Date;   // New field for sorting
  secondWeekendStartDate?: Date;
  secondWeekendEndDate?: Date;
}

export interface Template {
  id: string;
  name: string;
  event: EventInfo;
  items: ChecklistItem[];
  thumbnail: string;
  prohibitedItemsLink: string;
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
  startTime: "12:00 PM",
  startDate: new Date(2025, 3, 11), // April 11, 2025
  endDate: new Date(2025, 3, 13),  // April 13, 2025,
  secondWeekendStartDate: new Date(2025, 3, 18), // April 18, 2025
  secondWeekendEndDate: new Date(2025, 3, 20) // April 20, 2025
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
    event: {
      ...sampleEvent,
      startDate: new Date(2025, 3, 11), // April 11, 2025
      endDate: new Date(2025, 3, 20)    // April 20, 2025
    },
    items: sampleChecklist,
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: ""
  },
  {
    id: "outsidelands",
    name: "Outside Lands",
    event: {
      name: "Outside Lands",
      date: "Aug 8-10, 2025",
      location: "Golden Gate Park, San Francisco, CA",
      startTime: "11:00 AM",
      startDate: new Date(2025, 7, 8),  // August 8, 2025
      endDate: new Date(2025, 7, 10)    // August 10, 2025
    },
    items: [
      { id: "ol-1", text: "Festival Wristband", category: "documents", isCompleted: false },
      { id: "ol-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "ol-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "ol-5", text: "Warm Layers", category: "clothing", isCompleted: false },
      { id: "ol-11", text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
      { id: "ol-13", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "ol-17", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "ol-18", text: "Hand Sanitizer / Hand Wipes", category: "toiletries", isCompleted: false },
      { id: "ol-19", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "ol-20", text: "Blanket for Sitting", category: "misc", isCompleted: false },
      { id: "ol-21", text: "Hydration Pack / Water Bottle", category: "misc", isCompleted: false },
      { id: "ol-23", text: "Sunglasses", category: "clothing", isCompleted: false }
    ],
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: ""
  },
  {
    id: "edc-las-vegas",
    name: "EDC Las Vegas",
    event: {
      name: "EDC Las Vegas",
      date: "May 16 – May 18, 2025",
      location: "Las Vegas Motor Speedway, Las Vegas, NV",
      startTime: "7:00 PM",
      startDate: new Date(2025, 4, 16),  // May 16, 2025
      endDate: new Date(2025, 4, 18)     // May 18, 2025
    },
    items: [
      { id: "edc-1", text: "Festival Wristband", category: "documents", isCompleted: false },
      { id: "edc-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "edc-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "edc-4", text: "Comfortable Shoes", category: "clothing", isCompleted: false },
      { id: "edc-5", text: "Portable Phone Charger", category: "electronics", isCompleted: false },
      { id: "edc-6", text: "Sunglasses", category: "clothing", isCompleted: false },
      { id: "edc-7", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "edc-8", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "edc-9", text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
      { id: "edc-10", text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
      { id: "edc-11", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
      { id: "edc-12", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "edc-13", text: "Fanny Pack", category: "clothing", isCompleted: false },
      { id: "edc-14", text: "Bandaids", category: "toiletries", isCompleted: false },
    ],
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop", 
    prohibitedItemsLink: "https://lasvegas.electricdaisycarnival.com/guide/hours-and-info/"
  },
  {
    id: "hitc",
    name: "Head In The Clouds",
    event: {
      name: "Head In The Clouds",
      date: "May 31 - Jun 1, 2025",
      location: "Brookside at the Rose Bowl, Pasadena, CA",
      startTime: "1:00 PM",
      startDate: new Date(2025, 4, 31),  // May 31, 2025
      endDate: new Date(2025, 5, 1)      // June 1, 2025
    },
    items: [
      { id: "hitc-1", text: "Festival Wristband", category: "documents", isCompleted: false },
      { id: "hitc-2", text: "ID/Driver's License", category: "documents", isCompleted: false },
      { id: "hitc-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "hitc-4", text: "Portable Phone Charger", category: "electronics", isCompleted: false },
      { id: "hitc-5", text: "Comfortable Shoes", category: "clothing", isCompleted: false },
      { id: "hitc-8", text: "Light Jacket (for evening)", category: "clothing", isCompleted: false },
      { id: "hitc-9", text: "Sunglasses", category: "clothing", isCompleted: false },
      { id: "hitc-11", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "hitc-12", text: "Hand Sanitizer / Hand Wipes", category: "toiletries", isCompleted: false },
      { id: "hitc-13", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "hitc-15", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "hitc-16", text: "Water Bottle", category: "misc", isCompleted: false },
      { id: "hitc-17", text: "Small Backpack / Fanny Pack", category: "clothing", isCompleted: false },
      { id: "hitc-19", text: "Bandaids", category: "toiletries", isCompleted: false },
    ],
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: ""
  },
  {
    id: "beyond-wonderland-gorge",
    name: "Beyond Wonderland at The Gorge",
    event: {
      name: "Beyond Wonderland at The Gorge",
      date: "June 21-22, 2025",
      location: "Gorge Amphitheatre, George, WA",
      startTime: "3:00 PM",
      startDate: new Date(2025, 5, 21),  // June 21, 2025
      endDate: new Date(2025, 5, 22)     // June 22, 2025
    },
    items: [
      { id: "bw-1", text: "Festival Wristband", category: "documents", isCompleted: false },
      { id: "bw-2", text: "ID/Driver's License (18+ event)", category: "documents", isCompleted: false },
      { id: "bw-3", text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
      { id: "bw-4", text: "Deodorant", category: "toiletries", isCompleted: false },
      { id: "bw-6", text: "Reusable Water Bottle (empty upon entry)", category: "misc", isCompleted: false },
      { id: "bw-9", text: "Hydration Pack (empty upon entry)", category: "misc", isCompleted: false },
      { id: "bw-10", text: "Sunscreen", category: "toiletries", isCompleted: false },
      { id: "bw-11", text: "Portable Charger", category: "electronics", isCompleted: false },
      { id: "bw-14", text: "Earplugs", category: "clothing", isCompleted: false },
      { id: "bw-16", text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
      { id: "bw-17", text: "Lip Balm", category: "toiletries", isCompleted: false },
      { id: "bw-18", text: "Bandaids", category: "toiletries", isCompleted: false }
    ],
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop", 
    prohibitedItemsLink: "https://pnw.beyondwonderland.com/guide/hours-and-info/"
  }
];
