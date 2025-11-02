export interface OutfitSubItem {
  id: string;
  type: 'shoes' | 'top' | 'bottom' | 'accessories';
  text: string;
  isCompleted: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  isCompleted: boolean;
  isOutfit?: boolean;
  outfitItems?: OutfitSubItem[];
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
  prohibitedItemsLink?: string; // New field for prohibited items link
}

export interface Template {
  id: string;
  name: string;
  event: EventInfo;
  items: ChecklistItem[];
  thumbnail: string;
  prohibitedItemsLink: string;
}

// Category type for better type safety
export type CategoryId = "documents" | "clothing" | "electronics" | "toiletries" | "outfits" | "misc";

export const categories = [
  { id: "documents" as CategoryId, name: "Documents", color: "bg-blue-100 text-blue-800" },
  { id: "clothing" as CategoryId, name: "Clothing", color: "bg-green-100 text-green-800" },
  { id: "electronics" as CategoryId, name: "Electronics", color: "bg-purple-100 text-purple-800" },
  { id: "toiletries" as CategoryId, name: "Toiletries", color: "bg-yellow-100 text-yellow-800" },
  { id: "outfits" as CategoryId, name: "Outfits", color: "bg-pink-100 text-pink-800" },
  { id: "misc" as CategoryId, name: "Miscellaneous", color: "bg-gray-100 text-gray-800" }
];

// Base checklist items - universal items for ALL festivals
const baseChecklistItems: Omit<ChecklistItem, 'id'>[] = [
  { text: "Festival Wristband", category: "documents", isCompleted: false },
  { text: "ID/Driver's License", category: "documents", isCompleted: false },
  { text: "Credit/Debit Cards & Cash", category: "documents", isCompleted: false },
  { text: "Earplugs", category: "clothing", isCompleted: false },
  { text: "Festival Outfit", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
];

// Helper function to generate unique IDs for checklist items
const generateChecklistItems = (prefix: string = "", items: Omit<ChecklistItem, 'id'>[]): ChecklistItem[] => {
  return items.map((item, index) => ({
    ...item,
    id: prefix ? `${prefix}-${index + 1}` : `${index + 1}`
  }));
};

// Helper function to combine base items with festival-specific items (avoiding duplicates)
const combineChecklistItems = (prefix: string = "", festivalSpecificItems: Omit<ChecklistItem, 'id'>[], excludeBaseItems: string[] = []): ChecklistItem[] => {
  // Get set of base item texts to check for duplicates
  const baseItemTexts = new Set(baseChecklistItems.map(item => item.text));
  
  // Filter out any items from festivalSpecificItems that are already in base
  const uniqueFestivalItems = festivalSpecificItems.filter(item => !baseItemTexts.has(item.text));
  
  // Filter out excluded items from base
  const filteredBaseItems = baseChecklistItems.filter(item => !excludeBaseItems.includes(item.text));
  
  // Combine filtered base items with unique festival items
  const allItems = [...filteredBaseItems, ...uniqueFestivalItems];
  
  return generateChecklistItems(prefix, allItems);
};

// Helper function to create a checklist item
export const createChecklistItem = (
  text: string,
  category: CategoryId,
  id?: string
): ChecklistItem => ({
  id: id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  text,
  category,
  isCompleted: false
});

// Helper function to clone items with a new ID prefix
export const cloneItemsWithPrefix = (items: ChecklistItem[], prefix: string): ChecklistItem[] => {
  return items.map(item => ({
    ...item,
    id: `${prefix}-${item.id}`,
    isCompleted: false
  }));
};

export const sampleEvent: EventInfo = {
  name: "Coachella",
  date: "April 10-12 & 17-19, 2026",
  location: "Empire Polo Club, Indio, CA",
  startTime: "1:00 PM",
  startDate: new Date(2026, 3, 10), // April 10, 2026
  endDate: new Date(2026, 3, 12),  // April 12, 2026,
  secondWeekendStartDate: new Date(2026, 3, 17), // April 17, 2026
  secondWeekendEndDate: new Date(2026, 3, 19), // April 19, 2026
  prohibitedItemsLink: "https://www.coachella.com/rules"
};

export const sampleChecklist: ChecklistItem[] = combineChecklistItems("", [
  { text: "Festival Outfit Day 1", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Festival Outfit Day 2", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Festival Outfit Day 3", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Bandanas/Masks", category: "clothing", isCompleted: false },
  { text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
  { text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
  { text: "Sunscreen", category: "toiletries", isCompleted: false },
  { text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
  { text: "Lip Balm", category: "toiletries", isCompleted: false },
  { text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
  { text: "Sunglasses", category: "clothing", isCompleted: false },
  { text: "Camera", category: "electronics", isCompleted: false },
  { text: "Eye Drops", category: "toiletries", isCompleted: false },
  { text: "Handheld Fan", category: "electronics", isCompleted: false },
  { text: "Fanny Pack", category: "clothing", isCompleted: false },
  { text: "Make-up", category: "toiletries", isCompleted: false },
  { text: "Water Mister (Personal Size)", category: "toiletries", isCompleted: false },
  { text: "Bandaids", category: "toiletries", isCompleted: false },
  { text: "Blanket (50\" x 70\" or smaller)", category: "misc", isCompleted: false }
], ["Festival Outfit"]);

// Coachella-specific items (outdoor desert festival) - base items automatically included
const coachellaSpecificItems: Omit<ChecklistItem, 'id'>[] = [
  { text: "Festival Outfit Day 1", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Festival Outfit Day 2", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Festival Outfit Day 3", category: "outfits", isCompleted: false, isOutfit: true, outfitItems: [] },
  { text: "Bandanas/Masks", category: "clothing", isCompleted: false },
  { text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
  { text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
  { text: "Sunscreen", category: "toiletries", isCompleted: false },
  { text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
  { text: "Lip Balm", category: "toiletries", isCompleted: false },
  { text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
  { text: "Sunglasses", category: "clothing", isCompleted: false },
  { text: "Camera", category: "electronics", isCompleted: false },
  { text: "Eye Drops", category: "toiletries", isCompleted: false },
  { text: "Handheld Fan", category: "electronics", isCompleted: false },
  { text: "Fanny Pack", category: "clothing", isCompleted: false },
  { text: "Make-up", category: "toiletries", isCompleted: false },
  { text: "Water Mister (Personal Size)", category: "toiletries", isCompleted: false },
  { text: "Bandaids", category: "toiletries", isCompleted: false },
  { text: "Blanket (50\" x 70\" or smaller)", category: "misc", isCompleted: false }
];

// Outside Lands specific items - base items automatically included
const outsideLandsSpecificItems: Omit<ChecklistItem, 'id'>[] = [
  { text: "Warm Layers", category: "clothing", isCompleted: false },
  { text: "Portable Charger/Power Bank", category: "electronics", isCompleted: false },
  { text: "Sunscreen", category: "toiletries", isCompleted: false },
  { text: "Hand Sanitizer / Hand Wipes", category: "toiletries", isCompleted: false },
  { text: "Lip Balm", category: "toiletries", isCompleted: false },
  { text: "Blanket for Sitting", category: "misc", isCompleted: false },
  { text: "Hydration Pack / Water Bottle", category: "misc", isCompleted: false },
  { text: "Sunglasses", category: "clothing", isCompleted: false }
];

// EDC Las Vegas specific items - base items automatically included
const edcLasVegasSpecificItems: Omit<ChecklistItem, 'id'>[] = [
  { text: "Comfortable Shoes", category: "clothing", isCompleted: false },
  { text: "Portable Phone Charger", category: "electronics", isCompleted: false },
  { text: "Sunglasses", category: "clothing", isCompleted: false },
  { text: "Sunscreen", category: "toiletries", isCompleted: false },
  { text: "Hydration Pack/Water Bottle", category: "misc", isCompleted: false },
  { text: "Light Jacket/Hoodie", category: "clothing", isCompleted: false },
  { text: "Hand Sanitizer", category: "toiletries", isCompleted: false },
  { text: "Lip Balm", category: "toiletries", isCompleted: false },
  { text: "Fanny Pack", category: "clothing", isCompleted: false },
  { text: "Bandaids", category: "toiletries", isCompleted: false },
];

// Festival templates
export const templates: Template[] = [
  {
    id: "coachella-weekend-1",
    name: "Coachella Festival - Weekend 1",
    event: {
      name: "Coachella - Weekend 1",
      date: "April 10-12, 2026",
      location: "Empire Polo Club, Indio, CA",
      startTime: "1:00 PM",
      startDate: new Date(2026, 3, 10), // April 10, 2026
      endDate: new Date(2026, 3, 12),  // April 12, 2026
      prohibitedItemsLink: "https://www.coachella.com/rules"
    },
    items: combineChecklistItems("", coachellaSpecificItems, ["Festival Outfit"]),
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: "https://www.coachella.com/rules"
  },
  {
    id: "coachella-weekend-2",
    name: "Coachella Festival - Weekend 2",
    event: {
      name: "Coachella - Weekend 2",
      date: "April 17-19, 2026",
      location: "Empire Polo Club, Indio, CA",
      startTime: "1:00 PM",
      startDate: new Date(2026, 3, 17), // April 17, 2026
      endDate: new Date(2026, 3, 19),  // April 19, 2026
      prohibitedItemsLink: "https://www.coachella.com/rules"
    },
    items: combineChecklistItems("w2", coachellaSpecificItems, ["Festival Outfit"]),
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: "https://www.coachella.com/rules"
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
    items: combineChecklistItems("ol", outsideLandsSpecificItems),
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    prohibitedItemsLink: ""
  },
  {
    id: "edc-las-vegas",
    name: "EDC Las Vegas",
    event: {
      name: "EDC Las Vegas",
      date: "May 13 ? May 15, 2026",
      location: "Las Vegas Motor Speedway, Las Vegas, NV",
      startTime: "7:00 PM",
      startDate: new Date(2026, 4, 13),  // May 13, 2026
      endDate: new Date(2026, 4, 15)     // May 15, 2026
    },
    items: combineChecklistItems("edc", edcLasVegasSpecificItems),
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop", 
    prohibitedItemsLink: "https://lasvegas.electricdaisycarnival.com/guide/hours-and-info/"
  }
];
