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
  
  const handleCopy = async () => {
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
      className="group relative rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
      onClick={handleCopy}
      style={{ 
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
      }}
    >
      {/* Widget Preview */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ 
          backgroundColor: theme.colors.muted,
        }}
      >
        <div className="absolute inset-0 scale-75">
          <WidgetComponent theme={theme} />
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3
              className="font-medium text-sm"
              style={{ color: theme.colors.primary }}
            >
              {widget.name}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: theme.colors.muted,
                color: theme.colors.secondary,
              }}
            >
              {widget.category}
            </span>
          </div>
          <p
            className="text-xs"
            style={{ color: theme.colors.secondary }}
          >
            {widget.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: theme.colors.border }}>
          <span
            className="text-xs font-mono"
            style={{ color: theme.colors.secondary }}
          >
            {widget.defaultSize.width}×{widget.defaultSize.height}
          </span>
          
          <button
            className="text-xs font-medium px-3 py-1 rounded-md transition-colors"
            style={{
              backgroundColor: copied ? theme.colors.primary : 'transparent',
              color: copied ? theme.colors.background : theme.colors.primary,
              border: `1px solid ${theme.colors.primary}`,
            }}
          >
            {copied ? '✓ Copied' : 'Copy URL'}
          </button>
        </div>
      </div>
    </div>
  );
}