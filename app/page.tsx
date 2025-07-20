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
        className="sticky top-0 z-50 border-b backdrop-blur-lg"
        style={{ 
          borderColor: currentTheme.colors.border,
          backgroundColor: currentTheme.colors.background + 'dd',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-semibold tracking-tight"
                style={{ color: currentTheme.colors.primary }}
              >
                Notion Widgets
              </h1>
              <p
                className="text-sm mt-0.5"
                style={{ color: currentTheme.colors.secondary }}
              >
                Beautiful embeddable widgets for your Notion workspace
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    currentTheme.id === theme.id
                      ? ''
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: currentTheme.id === theme.id
                      ? currentTheme.colors.primary
                      : 'transparent',
                    color: currentTheme.id === theme.id
                      ? currentTheme.colors.background
                      : currentTheme.colors.foreground,
                    border: `1px solid ${
                      currentTheme.id === theme.id 
                        ? currentTheme.colors.primary 
                        : currentTheme.colors.border
                    }`,
                  }}
                >
                  {theme.name.replace(' Light', '').replace(' Dark', '')}
                  {theme.id.includes('Light') && ' L'}
                  {theme.id.includes('Dark') && ' D'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 
              className="text-lg font-medium mb-2"
              style={{ color: currentTheme.colors.primary }}
            >
              Widget Collection
            </h2>
            <p 
              className="text-sm"
              style={{ color: currentTheme.colors.secondary }}
            >
              Click any widget to copy its embed URL for Notion
            </p>
          </div>
          
          {/* Widget Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div 
            className="mt-12 p-6 rounded-lg border text-center"
            style={{ 
              borderColor: currentTheme.colors.border,
              backgroundColor: currentTheme.colors.background,
            }}
          >
            <h3 
              className="text-sm font-medium mb-2"
              style={{ color: currentTheme.colors.primary }}
            >
              How to use
            </h3>
            <ol 
              className="text-sm space-y-1"
              style={{ color: currentTheme.colors.secondary }}
            >
              <li>1. Choose your preferred theme from the header</li>
              <li>2. Click on any widget to copy its URL</li>
              <li>3. In Notion, type <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">/embed</code> and paste the URL</li>
              <li>4. Resize the embed block to fit your layout</li>
            </ol>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-20 border-t"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <div className="container mx-auto px-6 py-6">
          <p
            className="text-xs text-center"
            style={{ color: currentTheme.colors.secondary }}
          >
            Made with ❤️ for Notion users • Open source on GitHub
          </p>
        </div>
      </footer>
    </div>
  );
}