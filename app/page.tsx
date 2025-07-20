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

  // Group widgets by category
  const groupedWidgets = widgets.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, typeof widgets>);

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.colors.muted }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ 
          borderColor: currentTheme.colors.border,
          backgroundColor: currentTheme.colors.background + 'ee'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div>
                <h1
                  className="text-xl font-semibold tracking-tight"
                  style={{ color: currentTheme.colors.primary }}
                >
                  Notion Widgets
                </h1>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: currentTheme.colors.secondary }}
                >
                  Beautiful widgets for your workspace
                </p>
              </div>
            </div>
            
            {/* Theme Switcher */}
            <div className="flex items-center gap-6">
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: currentTheme.colors.secondary }}
              >
                Theme
              </span>
              <div className="flex items-center gap-1">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className="w-8 h-8 rounded-lg border transition-all"
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: currentTheme.id === theme.id 
                        ? currentTheme.colors.primary 
                        : 'transparent',
                      borderWidth: '2px',
                    }}
                    title={theme.name}
                  >
                    <span className="sr-only">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Sections */}
        {Object.entries(groupedWidgets).map(([category, categoryWidgets]) => (
          <div key={category} className="mb-12">
            <div className="mb-6">
              <h2
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: currentTheme.colors.secondary }}
              >
                {category}
              </h2>
              <div 
                className="mt-2 h-px"
                style={{ backgroundColor: currentTheme.colors.border }}
              />
            </div>
            
            {/* Widget Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categoryWidgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  theme={currentTheme}
                  baseUrl={baseUrl}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t" style={{ borderColor: currentTheme.colors.border }}>
          <div className="text-center">
            <p
              className="text-sm"
              style={{ color: currentTheme.colors.secondary }}
            >
              Click any widget to copy its embed URL
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: currentTheme.colors.secondary, opacity: 0.7 }}
            >
              Use <code className="px-1 py-0.5 rounded" style={{ backgroundColor: currentTheme.colors.muted }}>/embed</code> in Notion to add widgets
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}