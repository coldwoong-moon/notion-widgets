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
    background: '#000000',
    foreground: '#ffffff',
    primary: '#66b3ff',
    secondary: '#999999',
    accent: '#99ccff',
    muted: '#666666',
    border: '#333333',
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

  useEffect(() => {
    // Check if we're in an iframe (embedded in Notion)
    const isEmbedded = window !== window.parent;
    
    const updateTheme = () => {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // If embedded, try to detect Notion's theme from background color
      if (isEmbedded) {
        // Notion dark mode typically has a dark background
        const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = backgroundColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          setTheme(brightness < 128 ? darkTheme : lightTheme);
        } else {
          setTheme(prefersDark ? darkTheme : lightTheme);
        }
      } else {
        setTheme(prefersDark ? darkTheme : lightTheme);
      }
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    // Also check periodically for Notion theme changes when embedded
    let interval: NodeJS.Timeout;
    if (isEmbedded) {
      interval = setInterval(updateTheme, 1000);
    }

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      if (interval) clearInterval(interval);
    };
  }, []);

  return theme;
}