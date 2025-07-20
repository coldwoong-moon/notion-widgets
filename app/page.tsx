'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { WidgetCard } from '@/components/WidgetCard';
import { widgets } from '@/lib/widgets';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Palette, ArrowRight, Code2, Copy } from 'lucide-react';
import { WidgetCustomizationDialog } from '@/components/WidgetCustomizationDialog';
import { Widget } from '@/types/theme';

export default function Home() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  
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

  const handleCustomize = (widget: Widget) => {
    setSelectedWidget(widget);
    setCustomizationOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Notion Widget Gallery
                </h1>
                <p className="text-xs text-muted-foreground">
                  Beautiful widgets for your workspace
                </p>
              </div>
            </div>
            
            {/* Theme Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2">Theme:</span>
              <div className="flex gap-1">
                {availableThemes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      currentTheme.id === theme.id && "ring-2 ring-offset-2 ring-primary"
                    )}
                    onClick={() => setTheme(theme.id)}
                    title={theme.name}
                  >
                    <div 
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="ml-2 text-xs opacity-70">
                  {category === 'all' ? widgets.length : widgets.filter(w => w.category === category).length}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Widget Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredWidgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              theme={currentTheme}
              baseUrl={baseUrl}
              onCustomize={handleCustomize}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredWidgets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No widgets found in this category.</p>
          </div>
        )}

        {/* How to Use Section */}
        <div className="mt-20 py-16 border-t">
          <h2 className="text-2xl font-bold text-center mb-12">
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Choose a Widget</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our gallery and select a widget that fits your needs
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="relative group">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Copy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Copy Widget URL</h3>
                <p className="text-sm text-muted-foreground">
                  Click the &quot;Copy URL&quot; button on any widget card
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Embed in Notion</h3>
                <p className="text-sm text-muted-foreground">
                  Type /embed in Notion and paste the URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Made with ❤️ for Notion users
          </p>
          <a 
            href="https://github.com/coldwoong-moon/notion-widgets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </footer>

      {/* Widget Customization Dialog */}
      <WidgetCustomizationDialog
        widget={selectedWidget}
        theme={currentTheme}
        baseUrl={baseUrl}
        open={customizationOpen}
        onOpenChange={setCustomizationOpen}
      />
    </div>
  );
}