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
  const WidgetComponent = widget.component;
  
  const handleCopy = async (e: React.MouseEvent) => {
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
    <div className="group relative">
      <div 
        className="rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg"
        style={{ 
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Widget Preview - Smaller Size */}
        <div 
          style={{ 
            width: '100%',
            height: '160px',
            backgroundColor: theme.colors.muted,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Scale the widget to fit */}
          <div style={{ 
            transform: 'scale(0.5)', 
            transformOrigin: 'center',
            width: '200%',
            height: '200%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-50%',
            left: '-50%'
          }}>
            <WidgetComponent theme={theme} />
          </div>
        </div>
        
        {/* Widget Info - Compact */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{widget.icon}</span>
            <h3 className="font-medium text-sm" style={{ color: theme.colors.primary }}>
              {widget.name}
            </h3>
          </div>
          
          <p className="text-xs mb-3 line-clamp-2" style={{ color: theme.colors.secondary }}>
            {widget.description}
          </p>
          
          {/* Copy Button - Smaller */}
          <button
            onClick={handleCopy}
            className="w-full py-1.5 px-3 rounded text-xs font-medium transition-all"
            style={{
              backgroundColor: copied ? '#10b981' : theme.colors.primary,
              color: theme.colors.background,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>
    </div>
  );
}