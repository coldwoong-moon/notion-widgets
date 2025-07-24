'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface CalendarProps {
  theme: Theme;
  locale?: Locale;
  notion: {
    width: number;
    height: number;
  };
}

export function Calendar({ theme, locale = 'en', notion }: CalendarProps) {
  const [currentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} notion={notion}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>Loading...</div>
      </WidgetContainer>
    );
  }
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();
  
  const monthNames = [
    t('calendar.january', locale),
    t('calendar.february', locale),
    t('calendar.march', locale),
    t('calendar.april', locale),
    t('calendar.may', locale),
    t('calendar.june', locale),
    t('calendar.july', locale),
    t('calendar.august', locale),
    t('calendar.september', locale),
    t('calendar.october', locale),
    t('calendar.november', locale),
    t('calendar.december', locale)
  ];
  
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
    <WidgetContainer theme={theme} notion={notion}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          <h2 className="text-2xl" style={{
            color: theme.colors.primary,
            fontWeight: '600',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}>
            {monthNames[month]}
          </h2>
          <p className="text-base" style={{
            color: theme.colors.secondary,
            opacity: 0.7,
          }}>
            {year}
          </p>
        </div>
        
        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          textAlign: 'center',
        }}>
          {/* Day headers */}
          {[
            t('calendar.sunday', locale),
            t('calendar.monday', locale),
            t('calendar.tuesday', locale),
            t('calendar.wednesday', locale),
            t('calendar.thursday', locale),
            t('calendar.friday', locale),
            t('calendar.saturday', locale)
          ].map((day, i) => (
            <div
              key={i}
              className="text-xs"
              style={{
                padding: '8px 0',
                fontWeight: '600',
                color: theme.colors.secondary,
                opacity: 0.6,
                letterSpacing: '0.05em',
              }}
            >
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isToday = day === today;
                const isWeekend = dayIndex === 0 || dayIndex === 6;
                
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="text-sm"
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      fontWeight: isToday ? '700' : '400',
                      color: isToday 
                        ? theme.colors.background 
                        : isWeekend && day 
                          ? theme.colors.accent
                          : day 
                            ? theme.colors.foreground 
                            : 'transparent',
                      backgroundColor: isToday 
                        ? theme.colors.primary 
                        : 'transparent',
                      border: isToday 
                        ? 'none' 
                        : day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                          ? `2px solid ${theme.colors.primary}20`
                          : 'none',
                      transition: 'all 0.2s ease',
                      cursor: day ? 'pointer' : 'default',
                      position: 'relative',
                    }}
                    onMouseOver={(e) => {
                      if (day && !isToday) {
                        e.currentTarget.style.backgroundColor = `${theme.colors.primary}10`;
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (day && !isToday) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {day || ''}
                    {isToday && (
                      <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: theme.colors.background,
                      }} />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Today indicator */}
        <div className="text-xs" style={{
          marginTop: '16px',
          textAlign: 'center',
          color: theme.colors.muted,
          opacity: 0.6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: theme.colors.primary,
          }} />
          {t('calendar.today', locale)}
        </div>
      </div>
    </WidgetContainer>
  );
}