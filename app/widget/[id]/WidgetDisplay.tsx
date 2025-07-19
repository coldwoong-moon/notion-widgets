'use client';

import React, { useEffect, useState } from 'react';
import { widgets } from '@/lib/widgets';
import { themes } from '@/lib/themes';

interface WidgetDisplayProps {
  widgetId: string;
}

export default function WidgetDisplay({ widgetId }: WidgetDisplayProps) {
  const [themeId, setThemeId] = useState('monochrome');
  
  useEffect(() => {
    // Get theme from URL query parameters on client side
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    if (urlTheme && themes[urlTheme]) {
      setThemeId(urlTheme);
    }
  }, []);
  
  const widget = widgets.find(w => w.id === widgetId);
  const theme = themes[themeId] || themes.monochrome;
  
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