'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';

interface ClockProps {
  theme: Theme;
  locale?: Locale;
}

export function Clock({ theme }: ClockProps) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme}>
        <div style={{ textAlign: 'center' }}>
          <div className="text-6xl" style={{ opacity: 0.1 }}>--:--:--</div>
        </div>
      </WidgetContainer>
    );
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayName = dayNames[time.getDay()];
  const date = time.getDate();
  const month = monthNames[time.getMonth()];
  const year = time.getFullYear();

  return (
    <WidgetContainer theme={theme}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          background: `radial-gradient(circle at center, ${theme.colors.accent} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        
        {/* Time Display */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '4px',
          marginBottom: '16px',
          fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
          fontWeight: '300',
          letterSpacing: '-0.02em',
        }}>
          <span className="text-6xl" style={{
            minWidth: '1.2em',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            color: theme.colors.primary,
          }}>
            {hours}
          </span>
          <span className="text-5xl" style={{
            color: theme.colors.primary,
            opacity: 0.4,
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            :
          </span>
          <span className="text-6xl" style={{
            minWidth: '1.2em',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            color: theme.colors.primary,
          }}>
            {minutes}
          </span>
          <span className="text-5xl" style={{
            color: theme.colors.primary,
            opacity: 0.4,
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            :
          </span>
          <span className="text-4xl" style={{
            minWidth: '1.2em',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            color: theme.colors.secondary,
            opacity: 0.7,
          }}>
            {seconds}
          </span>
        </div>
        
        {/* Date Display */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}>
          <div className="text-lg" style={{
            color: theme.colors.secondary,
            fontWeight: '500',
            letterSpacing: '0.05em',
          }}>
            {dayName}
          </div>
          <div className="text-sm" style={{
            color: theme.colors.secondary,
            opacity: 0.7,
            letterSpacing: '0.02em',
          }}>
            {month} {date}, {year}
          </div>
        </div>

        {/* Time zone indicator */}
        <div className="text-xs" style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          color: theme.colors.muted,
          opacity: 0.5,
          fontFamily: 'system-ui',
        }}>
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </div>
      </div>
    </WidgetContainer>
  );
}