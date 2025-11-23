'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

import { SYSTEM_FONT_FAMILY } from '@/lib/constants';

// Notion-aligned color themes
// Based on Notion's official light and dark mode color schemes
export const lightTheme: Theme = {
  id: 'light',
  name: 'Light',
  colors: {
    background: '#ffffff',
    foreground: '#37352f',    // Notion's light mode text color
    primary: '#2383e2',       // Notion's blue accent
    secondary: '#787774',     // Notion's secondary text
    accent: '#0b6e99',        // Notion's darker blue
    muted: '#9b9a97',         // Notion's muted text
    border: '#e9e9e7',        // Notion's light border
  },
  typography: {
    fontFamily: SYSTEM_FONT_FAMILY,
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};

export const darkTheme: Theme = {
  id: 'dark',
  name: 'Dark',
  colors: {
    background: '#191919',    // Notion's dark mode background
    foreground: '#e6e6e5',    // Notion's dark mode text
    primary: '#529cca',       // Notion's blue accent in dark mode
    secondary: '#9b9a97',     // Notion's secondary text in dark mode
    accent: '#6cb4e8',        // Notion's lighter blue
    muted: '#6f6f6f',         // Notion's muted text in dark mode
    border: '#373737',        // Notion's dark mode border
  },
  typography: {
    fontFamily: SYSTEM_FONT_FAMILY,
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};

export function useSystemTheme() {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if we're in an iframe (embedded in Notion)
    const embedded = window !== window.parent;
    setIsEmbedded(embedded);
    
    const updateTheme = () => {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Create theme with transparent background when embedded
      const baseTheme = prefersDark ? darkTheme : lightTheme;
      
      if (embedded) {
        // For embedded widgets, use transparent background
        const transparentTheme = {
          ...baseTheme,
          colors: {
            ...baseTheme.colors,
            background: 'transparent',
          }
        };
        setTheme(transparentTheme);
      } else {
        setTheme(baseTheme);
      }
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateTheme();
    
    mediaQuery.addEventListener('change', handleChange);

    // Listen for visibility changes to detect Notion theme changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTheme();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for focus to detect potential theme changes
    window.addEventListener('focus', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', updateTheme);
    };
  }, []);

  return theme;
}
