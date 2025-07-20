'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface CountdownProps {
  theme: Theme;
}

export function Countdown({ theme }: CountdownProps) {
  const targetDate = new Date('2025-01-01T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div
      className="text-center p-4 rounded-xl"
      style={{
        backgroundColor: isGlassmorphism 
          ? 'rgba(255, 255, 255, 0.1)' 
          : isNeumorphism 
            ? theme.colors.background
            : theme.colors.muted,
        ...(isNeumorphism && theme.styles && {
          boxShadow: '5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.1)',
        }),
      }}
    >
      <div
        className="text-3xl font-bold tabular-nums"
        style={{ color: theme.colors.primary }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div
        className="text-xs uppercase tracking-wider mt-1"
        style={{ color: theme.colors.secondary }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div
      className="flex items-center justify-center h-full p-6"
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
        className="p-6 rounded-2xl"
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
          }),
        }}
      >
        <h3
          className="text-center text-sm font-medium mb-4"
          style={{ color: theme.colors.secondary }}
        >
          New Year 2025
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
}