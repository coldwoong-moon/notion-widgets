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
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    setLocale(getLocale());

    // Check if we're embedded in an iframe (Notion)
    try {
      setIsEmbedded(window !== window.parent);
    } catch {
      setIsEmbedded(false);
    }
  }, []);

  const widget = widgets.find(w => w.id === widgetId);

  if (!widget) {
    return null;
  }

  const WidgetComponent = widget.component;

  // When embedded (Notion), use 100% to fit the iframe
  // When standalone (web), use the widget's defaultSize
  const containerStyle = isEmbedded ? {
    width: '100%',
    height: '100%',
  } : {
    width: `${widget.defaultSize.width}px`,
    height: `${widget.defaultSize.height}px`,
    maxWidth: '100vw',
    maxHeight: '100vh',
  };

  return (
    <div
      style={{
        ...containerStyle,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: systemTheme.colors.background,
        transition: 'background-color 0.3s ease',
        margin: isEmbedded ? '0' : 'auto',
        position: isEmbedded ? 'static' : 'relative',
      }}
    >
      <WidgetComponent theme={systemTheme} locale={locale} notion={widget.notion} />
    </div>
  );
}