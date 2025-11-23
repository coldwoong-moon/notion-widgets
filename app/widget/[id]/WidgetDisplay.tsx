'use client';

import React, { useEffect, useState } from 'react';
import { widgets } from '@/lib/widgets';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { getLocale } from '@/lib/i18n';

interface WidgetDisplayProps {
  widgetId: string;
}

export default function WidgetDisplay({ widgetId }: WidgetDisplayProps) {
  const systemTheme = useSystemTheme();
  const [locale, setLocale] = useState(getLocale());
  
  useEffect(() => {
    setLocale(getLocale());
  }, []);
  
  const widget = widgets.find(w => w.id === widgetId);
  
  if (!widget) {
    return null;
  }

  const WidgetComponent = widget.component;

  return (
    <div 
      style={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: systemTheme.colors.background,
        transition: 'background-color 0.3s ease',
      }}
    >
      <WidgetComponent theme={systemTheme} locale={locale} />
    </div>
  );
}