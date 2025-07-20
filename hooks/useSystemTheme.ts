'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

const lightTheme: Theme = {
  id: 'light',
  name: 'Light',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0066cc',
    secondary: '#666666',
    accent: '#0099ff',
    muted: '#999999',
    border: '#e5e5e5',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
};

const darkTheme: Theme = {
  id: 'dark',
  name: 'Dark',
  colors: {
    background: '#191919',  // Notion's dark mode background
    foreground: '#e6e6e5',  // Notion's dark mode text
    primary: '#66b3ff',
    secondary: '#999999',
    accent: '#99ccff',
    muted: '#666666',
    border: '#373737',      // Notion's dark mode border
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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