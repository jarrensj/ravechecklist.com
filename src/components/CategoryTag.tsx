
import React from 'react';
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  name: string;
  colorClass: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ 
  name, 
  colorClass, 
  isSelected = false,
  onClick 
}) => {
  return (
    <button
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium transition-all",
        colorClass,
        isSelected ? "ring-2 ring-offset-2 ring-sky-500" : "",
        "hover:opacity-90"
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CategoryTag;
