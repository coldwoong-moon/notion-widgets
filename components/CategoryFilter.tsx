'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  widgetCounts: Record<string, number>;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  widgetCounts,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        const count = widgetCounts[category] || 0;
        
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap
              transition-all duration-300 focus-ring
              ${isSelected
                ? 'bg-purple-500 text-white shadow-lg hover:bg-purple-600'
                : 'glass glass-hover text-gray-700 dark:text-gray-300'
              }
            `}
          >
            <span className="capitalize">{category}</span>
            <span className={`ml-2 text-xs ${
              isSelected ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}