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
      className="group relative flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      style={{ 
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: isHovered ? '0 10px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Widget Preview */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ 
          minHeight: '200px',
          backgroundColor: theme.colors.muted,
        }}
      >
        <div className="absolute inset-0 scale-90">
          <WidgetComponent theme={theme} />
        </div>
        
        {/* Hover Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div className="text-center text-white p-4">
            <div className="mb-2">
              <svg 
                className="w-12 h-12 mx-auto mb-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <p className="text-sm font-medium">
              {copied ? '✓ URL Copied!' : 'Click to Copy URL'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Widget Info */}
      <div
        className="p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-base font-medium"
            style={{ color: theme.colors.primary }}
          >
            {widget.name}
          </h3>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: theme.colors.muted,
              color: theme.colors.secondary,
            }}
          >
            {widget.category}
          </span>
        </div>
        
        <p
          className="text-xs mb-3 line-clamp-2"
          style={{ color: theme.colors.secondary }}
        >
          {widget.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{ color: theme.colors.secondary }}
          >
            {widget.defaultSize.width} × {widget.defaultSize.height}
          </span>
          
          <div className="flex items-center gap-1">
            {copied ? (
              <span className="text-xs font-medium text-green-600">
                Copied!
              </span>
            ) : (
              <span 
                className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: theme.colors.secondary }}
              >
                Copy URL
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}