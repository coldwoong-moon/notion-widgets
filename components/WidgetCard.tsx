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

  const WidgetComponent = widget.component;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: theme.colors.background,
        boxShadow: isHovered 
          ? '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.08)'
          : '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Widget Preview */}
      <div 
        className="relative w-full h-48 overflow-hidden"
        style={{ 
          backgroundColor: theme.colors.muted,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full h-full scale-90">
            <WidgetComponent theme={theme} />
          </div>
        </div>
        
        {/* Quick Actions - Only on Hover */}
        <div className={`absolute top-3 right-3 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg backdrop-blur-md transition-colors"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${theme.colors.border}`,
            }}
            title="Copy embed URL"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: theme.colors.primary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h3
              className="font-semibold text-base leading-tight mb-1"
              style={{ color: theme.colors.primary }}
            >
              {widget.name}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: theme.colors.secondary }}
            >
              {widget.description}
            </p>
          </div>
        </div>
        
        {/* Widget Meta */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: theme.colors.secondary }}
            >
              {widget.category}
            </span>
          </div>
          <span
            className="text-xs"
            style={{ color: theme.colors.secondary, opacity: 0.5 }}
          >
            •
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: theme.colors.secondary, opacity: 0.7 }}
          >
            {widget.defaultSize.width}×{widget.defaultSize.height}
          </span>
        </div>
      </div>
    </div>
  );
}