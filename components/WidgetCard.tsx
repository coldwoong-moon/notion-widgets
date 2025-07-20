'use client';

import React, { useState } from 'react';
import { Widget, Theme } from '@/types/theme';

interface WidgetCardProps {
  widget: Widget;
  theme: Theme;
  baseUrl: string;
}

export function WidgetCard({ widget, theme, baseUrl }: WidgetCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}`;
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className="group relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      style={{ 
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: isHovered 
          ? '0 4px 12px rgba(0, 0, 0, 0.1)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {/* Main Content */}
      <div className="flex items-center gap-3 p-3">
        {/* Icon */}
        <div className="text-2xl flex-shrink-0">
          {widget.icon}
        </div>
        
        {/* Widget Info */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-medium text-sm truncate"
            style={{ color: theme.colors.primary }}
          >
            {widget.name}
          </h3>
          <p
            className="text-xs truncate mt-0.5"
            style={{ color: theme.colors.secondary }}
          >
            {widget.category}
          </p>
        </div>
      </div>

      {/* Copy Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium
            bg-green-500 text-white
            transition-all duration-300 transform
            ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        </div>
      </div>
    </div>
  );
}