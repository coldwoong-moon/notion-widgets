'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface YearProgressProps {
  theme: Theme;
}

export function YearProgress({ theme }: YearProgressProps) {
  const [progress, setProgress] = useState({
    year: 0,
    month: 0,
    day: 0,
  });

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const year = now.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year + 1, 0, 1);
      const startOfMonth = new Date(year, now.getMonth(), 1);
      const endOfMonth = new Date(year, now.getMonth() + 1, 1);
      const startOfDay = new Date(year, now.getMonth(), now.getDate());
      const endOfDay = new Date(year, now.getMonth(), now.getDate() + 1);

      const yearProgress = ((now.getTime() - startOfYear.getTime()) / 
        (endOfYear.getTime() - startOfYear.getTime())) * 100;
      
      const monthProgress = ((now.getTime() - startOfMonth.getTime()) / 
        (endOfMonth.getTime() - startOfMonth.getTime())) * 100;
      
      const dayProgress = ((now.getTime() - startOfDay.getTime()) / 
        (endOfDay.getTime() - startOfDay.getTime())) * 100;

      setProgress({
        year: Math.floor(yearProgress),
        month: Math.floor(monthProgress),
        day: Math.floor(dayProgress),
      });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

  const ProgressBar = ({ label, value, emoji }: { label: string; value: number; emoji: string }) => (
    <div className="mb-4">
      <div
        className="flex justify-between mb-2 text-sm"
        style={{ color: theme.colors.secondary }}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          {label}
        </span>
        <span className="font-medium">{value}%</span>
      </div>
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ 
          backgroundColor: theme.colors.muted,
          ...(isNeumorphism && theme.styles && {
            boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.1)',
          }),
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
          style={{
            width: `${value}%`,
            backgroundColor: theme.colors.primary,
            ...(isGlassmorphism && {
              background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            }),
          }}
        >
          {(isNeumorphism || isGlassmorphism) && (
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
              }}
            />
          )}
        </div>
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
          backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
        <h3
          className="text-lg font-light mb-6 text-center flex items-center justify-center gap-2"
          style={{ color: theme.colors.primary }}
        >
          <span className="text-2xl">⏰</span>
          Time Progress
        </h3>
        
        <ProgressBar label="Year" value={progress.year} emoji="📅" />
        <ProgressBar label="Month" value={progress.month} emoji="📆" />
        <ProgressBar label="Day" value={progress.day} emoji="🌅" />
      </div>
    </div>
  );
}