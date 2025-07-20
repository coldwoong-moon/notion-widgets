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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: currentTheme.colors.primary }}
          >
            Widget Gallery
          </h2>
          <p
            className="text-lg"
            style={{ color: currentTheme.colors.secondary }}
          >
            Choose from our collection of beautiful widgets
          </p>
        </div>

        {/* All Widgets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ 
              backgroundColor: currentTheme.colors.muted,
              color: currentTheme.colors.secondary 
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click any widget to copy its embed URL
          </div>
        </div>
      </main>
    </div>
  );
}