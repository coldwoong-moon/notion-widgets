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
      {/* Header */}
      <header 
        className="sticky top-0 z-50 border-b"
        style={{ 
          borderColor: currentTheme.colors.border,
          backgroundColor: currentTheme.colors.background,
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="text-xl font-semibold"
              style={{ color: currentTheme.colors.primary }}
            >
              Notion Widgets
            </h1>
            
            {/* Theme Switcher */}
            <div className="flex items-center gap-2">
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className="w-8 h-8 rounded-lg border-2 transition-all"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: currentTheme.id === theme.id 
                      ? currentTheme.colors.primary 
                      : 'transparent',
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

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4" style={{ color: currentTheme.colors.primary }}>
            Beautiful Widgets for Notion
          </h2>
          <p className="text-lg mb-8" style={{ color: currentTheme.colors.secondary }}>
            Enhance your workspace with customizable widgets
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Widget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              theme={currentTheme}
              baseUrl={baseUrl}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center">
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
      </main>
    </div>
  );
}