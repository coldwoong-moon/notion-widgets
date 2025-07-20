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
      className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      style={{ 
        backgroundColor: theme.colors.muted,
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0,0,0,0.15)' 
          : '0 4px 12px rgba(0,0,0,0.05)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Widget Preview */}
      <div 
        className="relative w-full"
        style={{ height: '250px' }}
      >
        <div className="absolute inset-0">
          <WidgetComponent theme={theme} />
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      {/* Info Overlay - Only on Hover */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="text-white">
          <h3 className="font-semibold text-lg mb-1">{widget.name}</h3>
          <p className="text-sm opacity-90 mb-3">{widget.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-75">
              {widget.defaultSize.width} × {widget.defaultSize.height}
            </span>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: copied ? 'rgba(34, 197, 94, 1)' : 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {copied ? '✓ Copied!' : 'Click to copy'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Badge */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: theme.colors.primary,
          backdropFilter: 'blur(10px)',
        }}
      >
        {widget.category}
      </div>
    </div>
  );
}