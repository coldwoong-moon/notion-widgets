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
  const [showPreview, setShowPreview] = useState(false);
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}`;
  const WidgetComponent = widget.component;
  
  const handleCopy = async () => {
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
      {/* Main Card */}
      <div 
        className="rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg"
        onClick={handleCopy}
        style={{ 
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      >
        {/* Icon and Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{widget.icon}</div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: theme.colors.primary }}>
                {widget.name}
              </h3>
              <p className="text-xs" style={{ color: theme.colors.secondary }}>
                {widget.category}
              </p>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm mb-4" style={{ color: theme.colors.secondary }}>
          {widget.description}
        </p>
        
        {/* Widget Size & Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: theme.colors.secondary, opacity: 0.7 }}>
            {widget.defaultSize.width} × {widget.defaultSize.height}
          </span>
          
          {copied && (
            <span className="text-xs font-medium" style={{ color: '#10b981' }}>
              ✓ Copied!
            </span>
          )}
        </div>
      </div>
      
      {/* Preview on Hover */}
      {showPreview && (
        <div className="absolute inset-x-0 top-full mt-2 z-50">
          <div 
            className="rounded-xl shadow-xl overflow-hidden"
            style={{ 
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <div className="p-2">
              <span className="text-xs font-medium" style={{ color: theme.colors.secondary }}>
                Preview
              </span>
            </div>
            <div 
              style={{ 
                width: '100%',
                height: 200,
                overflow: 'hidden',
                backgroundColor: theme.colors.muted,
              }}
            >
              <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left' }}>
                <WidgetComponent theme={theme} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}