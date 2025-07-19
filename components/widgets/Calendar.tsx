'use client';

import React, { useState } from 'react';
import { Theme } from '@/types/theme';

interface CalendarProps {
  theme: Theme;
}

export function Calendar({ theme }: CalendarProps) {
  const [currentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div
      className="p-6 h-full"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-light"
          style={{ color: theme.colors.primary }}
        >
          {monthNames[month]} {year}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div
            key={i}
            className="text-xs font-medium py-2"
            style={{ color: theme.colors.secondary }}
          >
            {day}
          </div>
        ))}
        
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`py-2 text-sm ${
                  day === today ? 'font-bold' : ''
                }`}
                style={{
                  color: day === today ? theme.colors.primary : theme.colors.foreground,
                  backgroundColor: day === today ? theme.colors.muted : 'transparent',
                  borderRadius: day === today ? '4px' : '0',
                }}
              >
                {day || ''}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}