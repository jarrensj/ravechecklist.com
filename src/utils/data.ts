
export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  isCompleted: boolean;
}

export interface TripInfo {
  destination: string;
  date: string;
  flightNumber: string;
  departureTime: string;
}

export const categories = [
  { id: "documents", name: "Documents", color: "bg-blue-100 text-blue-800" },
  { id: "clothing", name: "Clothing", color: "bg-green-100 text-green-800" },
  { id: "electronics", name: "Electronics", color: "bg-purple-100 text-purple-800" },
  { id: "toiletries", name: "Toiletries", color: "bg-yellow-100 text-yellow-800" },
  { id: "misc", name: "Miscellaneous", color: "bg-gray-100 text-gray-800" }
];

export const sampleTrip: TripInfo = {
  destination: "San Francisco",
  date: "November 15, 2023",
  flightNumber: "AA1234",
  departureTime: "10:30 AM"
};

export const sampleChecklist: ChecklistItem[] = [
  { id: "1", text: "Passport", category: "documents", isCompleted: false },
  { id: "2", text: "Boarding Pass", category: "documents", isCompleted: false },
  { id: "3", text: "ID Card", category: "documents", isCompleted: false },
  { id: "4", text: "Travel Insurance", category: "documents", isCompleted: false },
  { id: "5", text: "T-shirts", category: "clothing", isCompleted: false },
  { id: "6", text: "Pants/Shorts", category: "clothing", isCompleted: false },
  { id: "7", text: "Underwear", category: "clothing", isCompleted: false },
  { id: "8", text: "Socks", category: "clothing", isCompleted: false },
  { id: "9", text: "Jacket/Sweater", category: "clothing", isCompleted: false },
  { id: "10", text: "Phone Charger", category: "electronics", isCompleted: false },
  { id: "11", text: "Laptop & Charger", category: "electronics", isCompleted: false },
  { id: "12", text: "Camera", category: "electronics", isCompleted: false },
  { id: "13", text: "Power Adapter", category: "electronics", isCompleted: false },
  { id: "14", text: "Toothbrush", category: "toiletries", isCompleted: false },
  { id: "15", text: "Toothpaste", category: "toiletries", isCompleted: false },
  { id: "16", text: "Shampoo", category: "toiletries", isCompleted: false },
  { id: "17", text: "Deodorant", category: "toiletries", isCompleted: false },
  { id: "18", text: "Sunscreen", category: "toiletries", isCompleted: false },
  { id: "19", text: "Travel Pillow", category: "misc", isCompleted: false },
  { id: "20", text: "Books/Magazines", category: "misc", isCompleted: false },
  { id: "21", text: "Snacks", category: "misc", isCompleted: false },
  { id: "22", text: "Water Bottle", category: "misc", isCompleted: false }
];
