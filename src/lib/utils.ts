import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shows a toast notification based on whether changes were made
 * @param toast - The toast function from useToast
 * @param hasChanges - Whether changes were detected
 * @param options - Toast options for both changed and unchanged states
 */
export function showUpdateToast(
  toast: (options: { title: string; description: string; duration: number; variant?: string }) => void,
  hasChanges: boolean,
  options: {
    changedTitle: string;
    changedDescription: string;
    unchangedTitle?: string;
    unchangedDescription?: string;
    duration?: number;
  }
) {
  if (hasChanges) {
    toast({
      title: options.changedTitle,
      description: options.changedDescription,
      duration: options.duration || 2000,
    });
  } else {
    toast({
      title: options.unchangedTitle || "No changes made",
      description: options.unchangedDescription || "Item remains unchanged",
      duration: options.duration || 2000,
    });
  }
}
