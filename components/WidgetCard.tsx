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
        className="rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl"
        style={{ 
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Widget Preview - Always Visible */}
        <div 
          style={{ 
            width: '100%',
            height: '250px',
            backgroundColor: theme.colors.muted,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Scale the widget to fit */}
          <div style={{ 
            transform: 'scale(0.7)', 
            transformOrigin: 'center',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <WidgetComponent theme={theme} />
          </div>
          
          {/* Overlay gradient for better text visibility */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: `linear-gradient(to top, ${theme.colors.background}, transparent)`,
          }} />
        </div>
        
        {/* Widget Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{widget.icon}</span>
              <div>
                <h3 className="font-semibold" style={{ color: theme.colors.primary }}>
                  {widget.name}
                </h3>
                <p className="text-xs" style={{ color: theme.colors.secondary, opacity: 0.7 }}>
                  {widget.category}
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm mb-3" style={{ color: theme.colors.secondary }}>
            {widget.description}
          </p>
          
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: copied ? '#10b981' : theme.colors.primary,
              color: theme.colors.background,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy Widget URL'}
          </button>
        </div>
      </div>
    </div>
  );
}