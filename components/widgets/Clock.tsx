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
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = dayNames[time.getDay()];
  const date = time.getDate();
  const month = monthNames[time.getMonth()];
  const year = time.getFullYear();

  return (
    <div
      className="flex items-center justify-center h-full p-6 relative overflow-hidden"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.colors.accent} 0%, transparent 70%)`,
          }}
        />
      </div>
      
      <div className="relative z-10 text-center">
        {/* Time Display */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 text-5xl font-light tracking-wider">
            <span className="inline-block min-w-[60px] tabular-nums animate-fade-in" key={hours}>
              {hours}
            </span>
            <span className="animate-pulse">:</span>
            <span className="inline-block min-w-[60px] tabular-nums animate-fade-in" key={minutes}>
              {minutes}
            </span>
            <span className="animate-pulse">:</span>
            <span className="inline-block min-w-[60px] tabular-nums animate-fade-in text-3xl opacity-60" key={seconds}>
              {seconds}
            </span>
          </div>
        </div>
        
        {/* Date Display */}
        <div className="space-y-1">
          <div
            className="text-sm font-medium opacity-80"
            style={{ color: theme.colors.secondary }}
          >
            {dayName}
          </div>
          <div
            className="text-xs opacity-60"
            style={{ color: theme.colors.secondary }}
          >
            {month} {date}, {year}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}