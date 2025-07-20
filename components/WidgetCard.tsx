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
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}`;
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const WidgetComponent = widget.component;

  return (
    <div
      className="group relative rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
      onClick={handleCopy}
      style={{ 
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
      }}
    >
      {/* Widget Preview */}
      <div 
        className="relative w-full h-40 overflow-hidden"
        style={{ backgroundColor: theme.colors.muted }}
      >
        <div className="absolute inset-0 scale-75">
          <WidgetComponent theme={theme} />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        
        {/* Copy Status */}
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-white font-medium">✓ URL Copied!</div>
          </div>
        )}
      </div>
      
      {/* Widget Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-medium text-sm leading-tight"
            style={{ color: theme.colors.primary }}
          >
            {widget.name}
          </h3>
          <span
            className="text-xs px-1.5 py-0.5 rounded shrink-0"
            style={{
              backgroundColor: theme.colors.muted,
              color: theme.colors.secondary,
            }}
          >
            {widget.category}
          </span>
        </div>
        
        <p
          className="text-xs leading-relaxed"
          style={{ color: theme.colors.secondary }}
        >
          {widget.description}
        </p>
        
        <div className="mt-2 flex items-center justify-between">
          <span
            className="text-xs font-mono"
            style={{ color: theme.colors.secondary, opacity: 0.7 }}
          >
            {widget.defaultSize.width}×{widget.defaultSize.height}
          </span>
          <span
            className="text-xs"
            style={{ color: theme.colors.accent }}
          >
            Click to copy →
          </span>
        </div>
      </div>
    </div>
  );
}