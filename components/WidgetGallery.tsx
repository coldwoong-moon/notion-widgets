'use client';

import React from 'react';
import { Widget, Theme } from '@/types/theme';
import { WidgetCard } from './WidgetCard';

interface WidgetGalleryProps {
  widgets: Widget[];
  theme: Theme;
  baseUrl: string;
}

export function WidgetGallery({ widgets, theme, baseUrl }: WidgetGalleryProps) {
  return (
    <div id="gallery" className="relative">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {widgets.map((widget, index) => (
          <div
            key={widget.id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'forwards',
            }}
          >
            <WidgetCard
              widget={widget}
              theme={theme}
              baseUrl={baseUrl}
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}