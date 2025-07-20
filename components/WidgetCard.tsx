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
      className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      style={{ 
        background: `linear-gradient(135deg, ${theme.colors.muted}, ${theme.colors.background})`,
        boxShadow: isHovered 
          ? '0 20px 40px -8px rgba(0, 0, 0, 0.15)'
          : '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Icon */}
        <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
          {widget.icon}
        </div>
        
        {/* Widget Name */}
        <h3
          className="font-semibold text-base text-center mb-2"
          style={{ color: theme.colors.primary }}
        >
          {widget.name}
        </h3>
        
        {/* Description - Show on hover */}
        <p
          className={`text-xs text-center transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{ color: theme.colors.secondary }}
        >
          {widget.description}
        </p>
      </div>

      {/* Copy Status Badge */}
      {(copied || isHovered) && (
        <div className="absolute top-3 right-3">
          <div
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium
              backdrop-blur-md transition-all duration-300
              ${copied ? 'bg-green-500/90 text-white' : 'bg-white/90'}
            `}
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              color: copied ? 'white' : theme.colors.primary,
            }}
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy URL
              </span>
            )}
          </div>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute bottom-3 left-3">
        <span
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: theme.colors.accent + '20',
            color: theme.colors.accent,
          }}
        >
          {widget.category}
        </span>
      </div>
    </div>
  );
}