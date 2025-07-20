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
      className="w-full overflow-hidden"
      style={{ 
        height: `${widget.defaultSize.height}px`,
        minHeight: `${widget.defaultSize.height}px`,
        maxHeight: `${widget.defaultSize.height}px`,
      }}
    >
      <WidgetComponent theme={systemTheme} locale={locale} />
    </div>
  );
}