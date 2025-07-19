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
    <div className="min-h-screen">
      <header
        className="border-b"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-light tracking-tight"
                style={{ color: currentTheme.colors.primary }}
              >
                Notion Widgets
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: currentTheme.colors.secondary }}
              >
                Beautiful embeddable widgets for your Notion pages
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span
                className="text-sm mr-2"
                style={{ color: currentTheme.colors.secondary }}
              >
                Theme:
              </span>
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`px-3 py-1 text-sm rounded transition-all ${
                    currentTheme.id === theme.id
                      ? 'ring-2 ring-offset-2'
                      : ''
                  }`}
                  style={{
                    backgroundColor: currentTheme.id === theme.id
                      ? currentTheme.colors.primary
                      : currentTheme.colors.muted,
                    color: currentTheme.id === theme.id
                      ? currentTheme.colors.background
                      : currentTheme.colors.foreground,
                    outlineColor: currentTheme.colors.primary,
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              theme={currentTheme}
              baseUrl={baseUrl}
            />
          ))}
        </div>
      </main>

      <footer
        className="border-t mt-16"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <div className="container mx-auto px-4 py-6">
          <p
            className="text-sm text-center"
            style={{ color: currentTheme.colors.secondary }}
          >
            Embed these widgets in your Notion pages by copying the URL and using the Embed block
          </p>
        </div>
      </footer>
    </div>
  );
}