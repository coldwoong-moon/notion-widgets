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

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

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
        className="p-6 rounded-2xl w-full max-w-sm"
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
                  className={`py-2 text-sm rounded-lg ${
                    day === today ? 'font-bold' : ''
                  }`}
                  style={{
                    color: day === today ? theme.colors.background : theme.colors.foreground,
                    backgroundColor: day === today 
                      ? theme.colors.primary 
                      : day && (isNeumorphism || isGlassmorphism) 
                        ? theme.colors.muted 
                        : 'transparent',
                    ...(day && isNeumorphism && day !== today && theme.styles && {
                      boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
                    }),
                    ...(day === today && isNeumorphism && theme.styles && {
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.1)',
                    }),
                  }}
                >
                  {day || ''}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}