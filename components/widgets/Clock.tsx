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

  return (
    <div
      className="flex items-center justify-center h-full p-8"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="text-center">
        <div
          className="text-6xl font-light tracking-wider"
          style={{ color: theme.colors.primary }}
        >
          {hours}:{minutes}
        </div>
        <div
          className="text-2xl font-light mt-2"
          style={{ color: theme.colors.secondary }}
        >
          {seconds}
        </div>
      </div>
    </div>
  );
}