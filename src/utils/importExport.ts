import type { ChecklistItem, OutfitSubItem, EventInfo } from './data';

const CURRENT_VERSION = '1.0';

// Mobile app format types (for compatibility)
interface MobileOutfitSubItem {
  id: string;
  name: string;
  checked: boolean;
}

interface MobileChecklistItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  isOutfit: boolean;
  subItems?: MobileOutfitSubItem[];
  note?: string;
  createdAt: number;
  updatedAt: number;
}

interface MobileChecklist {
  id: string;
  name: string;
  items: MobileChecklistItem[];
  createdAt: number;
  updatedAt: number;
}

interface ExportedChecklist {
  version: string;
  exportedAt: number;
  checklist: MobileChecklist;
}

// Category mapping between web and mobile
const categoryToMobile: Record<string, string> = {
  'misc': 'miscellaneous',
};

const categoryToWeb: Record<string, string> = {
  'miscellaneous': 'misc',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Convert web ChecklistItem to mobile format
function convertItemToMobile(item: ChecklistItem): MobileChecklistItem {
  const now = Date.now();
  const mobileCategory = categoryToMobile[item.category] || item.category;

  return {
    id: item.id,
    name: item.text,
    category: mobileCategory,
    checked: item.isCompleted,
    isOutfit: item.isOutfit || false,
    subItems: item.outfitItems?.map((subItem): MobileOutfitSubItem => ({
      id: subItem.id,
      name: subItem.text,
      checked: subItem.isCompleted,
    })),
    createdAt: now,
    updatedAt: now,
  };
}

// Convert mobile ChecklistItem to web format
function convertItemToWeb(item: MobileChecklistItem): ChecklistItem {
  const webCategory = categoryToWeb[item.category] || item.category;

  const webItem: ChecklistItem = {
    id: generateId(),
    text: item.name,
    category: webCategory,
    isCompleted: item.checked,
    isOutfit: item.isOutfit,
  };

  if (item.isOutfit && item.subItems) {
    webItem.outfitItems = item.subItems.map((subItem): OutfitSubItem => ({
      id: generateId(),
      type: 'accessories', // Default type since mobile doesn't have types
      text: subItem.name,
      isCompleted: subItem.checked,
    }));
  }

  return webItem;
}

// Export checklist to mobile-compatible format
export function exportChecklist(items: ChecklistItem[], eventInfo: EventInfo): string {
  const now = Date.now();

  const checklist: MobileChecklist = {
    id: generateId(),
    name: eventInfo.name || 'My Festival Checklist',
    items: items.map(convertItemToMobile),
    createdAt: now,
    updatedAt: now,
  };

  const exported: ExportedChecklist = {
    version: CURRENT_VERSION,
    exportedAt: now,
    checklist,
  };

  return JSON.stringify(exported, null, 2);
}

interface ImportResult {
  items: ChecklistItem[];
  name: string;
}

interface ImportError {
  error: string;
}

// Validate and import checklist from mobile format
export function validateAndImportChecklist(json: string): ImportResult | ImportError {
  try {
    const parsed = JSON.parse(json);

    // Handle both raw Checklist and ExportedChecklist format
    const checklist = parsed.checklist || parsed;

    if (!checklist.name || !Array.isArray(checklist.items)) {
      return { error: 'Invalid checklist format: missing name or items' };
    }

    // Basic validation of items
    for (const item of checklist.items) {
      if (!item.name || !item.category) {
        return { error: 'Invalid item: missing name or category' };
      }
    }

    // Convert items to web format
    const webItems = checklist.items.map((item: MobileChecklistItem) => convertItemToWeb(item));

    return {
      items: webItems,
      name: checklist.name,
    };
  } catch {
    return { error: 'Invalid JSON format' };
  }
}

// Copy text to clipboard (browser API)
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

// Read text from clipboard (browser API)
export async function readFromClipboard(): Promise<string | null> {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}

// Check if import result is an error
export function isImportError(result: ImportResult | ImportError): result is ImportError {
  return 'error' in result;
}
