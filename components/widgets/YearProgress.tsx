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

  const ProgressBar = ({ label, value }: { label: string; value: number }) => (
    <div className="mb-4">
      <div
        className="flex justify-between mb-1 text-sm"
        style={{ color: theme.colors.secondary }}
      >
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        className="w-full h-2 rounded-full"
        style={{ backgroundColor: theme.colors.muted }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: theme.colors.primary,
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="p-6 h-full flex flex-col justify-center"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <h3
        className="text-lg font-light mb-4 text-center"
        style={{ color: theme.colors.primary }}
      >
        Time Progress
      </h3>
      
      <ProgressBar label="Year" value={progress.year} />
      <ProgressBar label="Month" value={progress.month} />
      <ProgressBar label="Day" value={progress.day} />
    </div>
  );
}