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
      <header className="border-b" style={{ borderColor: currentTheme.colors.border }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                  className="w-6 h-6 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: currentTheme.id === theme.id 
                      ? currentTheme.colors.primary 
                      : theme.colors.border,
                    transform: currentTheme.id === theme.id ? 'scale(1.1)' : 'scale(1)',
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Widget Grid - Centered */}
        <div className="flex flex-wrap justify-center gap-4">
          {widgets.map((widget) => (
            <div key={widget.id} className="w-72">
              <WidgetCard
                widget={widget}
                theme={currentTheme}
                baseUrl={baseUrl}
              />
            </div>
          ))}
        </div>

        {/* Usage Instructions */}
        <div className="mt-16 text-center">
          <p
            className="text-sm"
            style={{ color: currentTheme.colors.secondary }}
          >
            Click any widget to copy its embed URL • Use <code>/embed</code> in Notion
          </p>
        </div>
      </main>
    </div>
  );
}