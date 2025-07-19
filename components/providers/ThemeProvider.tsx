'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme } from '@/types/theme';
import { themes, defaultTheme } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  const setTheme = (themeId: string) => {
    const theme = themes[themeId];
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}