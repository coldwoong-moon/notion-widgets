'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { WidgetCard } from '@/components/WidgetCard';
import { widgets } from '@/lib/widgets';

export default function Home() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  
  // Get the proper base URL for widget embeds
  const baseUrl = typeof window !== 'undefined' 
    ? process.env.NODE_ENV === 'production'
      ? 'https://coldwoong-moon.github.io/notion-widgets'
      : window.location.origin
    : '';

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Minimal Header */}
      <header className="border-b" style={{ borderColor: currentTheme.colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="text-lg font-medium"
              style={{ color: currentTheme.colors.primary }}
            >
              Notion Widgets
            </h1>
            
            {/* Minimal Theme Switcher */}
            <div className="flex items-center gap-1">
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: currentTheme.id === theme.id 
                      ? currentTheme.colors.primary 
                      : theme.colors.border,
                    transform: currentTheme.id === theme.id ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={theme.name}
                >
                  <span className="sr-only">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {widgets.map((widget, index) => (
            <div
              key={widget.id}
              className="break-inside-avoid"
              style={{
                // Vary heights for visual interest
                transform: `translateY(${index % 2 === 0 ? '0' : '10'}px)`,
              }}
            >
              <WidgetCard
                widget={widget}
                theme={currentTheme}
                baseUrl={baseUrl}
              />
            </div>
          ))}
        </div>

        {/* Floating Help */}
        <div
          className="fixed bottom-6 right-6 p-4 rounded-lg shadow-lg max-w-xs"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border,
            border: '1px solid',
          }}
        >
          <h3
            className="text-sm font-medium mb-2"
            style={{ color: currentTheme.colors.primary }}
          >
            Quick Tips
          </h3>
          <ul
            className="text-xs space-y-1"
            style={{ color: currentTheme.colors.secondary }}
          >
            <li>• Click any widget to copy its URL</li>
            <li>• Use /embed in Notion to add widgets</li>
            <li>• Try different themes with the circles above</li>
          </ul>
        </div>
      </main>
    </div>
  );
}