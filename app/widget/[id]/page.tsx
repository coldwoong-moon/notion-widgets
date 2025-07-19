'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { widgets } from '@/lib/widgets';
import { themes } from '@/lib/themes';
import { Theme } from '@/types/theme';

interface WidgetPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function WidgetPage({ params, searchParams }: WidgetPageProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      const resolvedSearchParams = await searchParams;
      
      const widget = widgets.find(w => w.id === resolvedParams.id);
      if (!widget) {
        notFound();
      }
      
      const themeId = resolvedSearchParams.theme as string || 'monochrome';
      const selectedTheme = themes[themeId] || themes.monochrome;
      
      setWidgetId(resolvedParams.id);
      setTheme(selectedTheme);
    };
    
    loadParams();
  }, [params, searchParams]);

  if (!widgetId || !theme) {
    return null;
  }

  const widget = widgets.find(w => w.id === widgetId);
  if (!widget) {
    return null;
  }

  const WidgetComponent = widget.component;

  return (
    <div className="w-full h-screen">
      <WidgetComponent theme={theme} />
    </div>
  );
}