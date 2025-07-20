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
      className="group relative"
      onMouseLeave={() => {
        setShowPreview(false);
      }}
    >
      {/* Main Card */}
      <div className="relative glass rounded-2xl p-6 hover-lift card-shine cursor-pointer h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.5'%3E%3Cpath d='M0 20L20 0L40 20L20 40z'/%3E%3C/g%3E%3C/svg%3E")` 
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon and Title */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-float">{widget.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {widget.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {widget.category}
                </p>
              </div>
            </div>
            
            {/* Preview Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPreview(!showPreview);
              }}
              className="p-2 rounded-lg glass glass-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Preview widget"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {widget.description}
          </p>
          
          {/* Widget Size */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {widget.defaultSize.width} × {widget.defaultSize.height}
            </span>
            
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium
                transition-all duration-300 focus-ring
                ${copied 
                  ? 'bg-green-500 text-white' 
                  : 'glass glass-hover text-gray-700 dark:text-gray-300'
                }
              `}
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
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <div className="absolute inset-x-0 top-full mt-2 z-50">
          <div className="glass rounded-2xl p-4 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Live Preview
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPreview(false);
                }}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div 
              className="widget-preview"
              style={{ 
                width: widget.defaultSize.width,
                height: widget.defaultSize.height,
              }}
            >
              <WidgetComponent theme={theme} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}