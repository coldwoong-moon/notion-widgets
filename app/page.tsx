'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { WidgetCard } from '@/components/WidgetCard';
import { widgets } from '@/lib/widgets';

export default function Home() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(widgets.map(w => w.category))];
  
  // Filter widgets by category
  const filteredWidgets = selectedCategory === 'all' 
    ? widgets 
    : widgets.filter(w => w.category === selectedCategory);
  
  // Get the proper base URL for widget embeds
  const baseUrl = typeof window !== 'undefined' 
    ? process.env.NODE_ENV === 'production'
      ? 'https://coldwoong-moon.github.io/notion-widgets'
      : window.location.origin
    : '';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ 
          borderColor: '#e5e7eb',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>
                Notion Widget Gallery
              </h1>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Beautiful widgets for your Notion workspace
              </p>
            </div>
            
            {/* Theme Switcher */}
            <div className="flex items-center gap-1">
              <span className="text-xs mr-2" style={{ color: '#6b7280' }}>Theme:</span>
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className="w-10 h-10 rounded-full border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: currentTheme.id === theme.id ? '#111827' : 'transparent',
                    borderWidth: currentTheme.id === theme.id ? '3px' : '2px',
                  }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 border-b" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        backdropFilter: 'blur(8px)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  backgroundColor: selectedCategory === category ? '#111827' : '#f3f4f6',
                  color: selectedCategory === category ? '#ffffff' : '#4b5563',
                  border: '1px solid transparent',
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="ml-2 text-xs opacity-70">
                  ({category === 'all' ? widgets.length : widgets.filter(w => w.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Widget Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredWidgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              theme={currentTheme}
              baseUrl={baseUrl}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredWidgets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No widgets found in this category.</p>
          </div>
        )}

        {/* How to Use Section */}
        <div className="mt-20 py-12 border-t" style={{ borderColor: '#e5e7eb' }}>
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#111827' }}>
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: '#ddd6fe' }}>
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>Choose a Widget</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Browse our gallery and select a widget that fits your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: '#fde68a' }}>
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>Copy Widget URL</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Click the &quot;Copy Widget URL&quot; button on any widget card
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: '#a7f3d0' }}>
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>Embed in Notion</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Type /embed in Notion and paste the URL
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
        <div className="text-center">
          <p className="text-sm" style={{ color: '#6b7280' }}>
            Made with ❤️ for Notion users
          </p>
          <a 
            href="https://github.com/coldwoong-moon/notion-widgets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
            style={{ color: '#6b7280' }}
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}