'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface ClockProps {
  theme: Theme;
}

export function Clock({ theme }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

  return (
    <div
      className="flex items-center justify-center h-full p-8"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
        ...(isGlassmorphism && {
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }),
      }}
    >
      <div
        className="text-center p-8 rounded-2xl"
        style={{
          backgroundColor: isGlassmorphism ? theme.colors.background : 'transparent',
          ...(theme.styles && {
            boxShadow: theme.styles.boxShadow,
            borderRadius: theme.styles.borderRadius,
            backdropFilter: theme.styles.backdropFilter,
            border: isGlassmorphism ? `1px solid ${theme.colors.border}` : 'none',
          }),
          ...(isNeumorphism && {
            backgroundColor: theme.colors.background,
            minWidth: '280px',
          }),
        }}
      >
        <div
          className="text-6xl font-light tracking-wider tabular-nums"
          style={{ color: theme.colors.primary }}
        >
          {hours}:{minutes}
        </div>
        <div
          className="text-2xl font-light mt-2 tabular-nums"
          style={{ color: theme.colors.secondary }}
        >
          {seconds}
        </div>
        
        {/* Visual elements for enhanced themes */}
        {(isNeumorphism || isGlassmorphism) && (
          <div className="mt-4 flex justify-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.accent }}
            />
          </div>
        )}
      </div>
    </div>
  );
}