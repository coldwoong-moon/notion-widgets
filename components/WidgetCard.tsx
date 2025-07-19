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
      className="border rounded-lg overflow-hidden transition-all hover:shadow-lg"
      style={{ borderColor: theme.colors.border }}
    >
      <div
        className="aspect-video relative overflow-hidden"
        style={{ backgroundColor: theme.colors.muted }}
      >
        <div className="absolute inset-0 scale-75">
          <WidgetComponent theme={theme} />
        </div>
      </div>
      
      <div
        className="p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <h3
          className="text-lg font-medium mb-1"
          style={{ color: theme.colors.primary }}
        >
          {widget.name}
        </h3>
        <p
          className="text-sm mb-3"
          style={{ color: theme.colors.secondary }}
        >
          {widget.description}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: theme.colors.muted,
              color: theme.colors.secondary,
            }}
          >
            {widget.category}
          </span>
          <span
            className="text-xs"
            style={{ color: theme.colors.secondary }}
          >
            {widget.defaultSize.width} × {widget.defaultSize.height}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="mt-3 w-full py-2 px-4 rounded transition-all text-sm font-medium"
          style={{
            backgroundColor: copied ? theme.colors.accent : theme.colors.primary,
            color: theme.colors.background,
          }}
        >
          {copied ? '✓ Copied!' : 'Copy Widget URL'}
        </button>
      </div>
    </div>
  );
}