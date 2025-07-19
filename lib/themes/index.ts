import { Theme } from '@/types/theme';

export const themes: Record<string, Theme> = {
  monochrome: {
    id: 'monochrome',
    name: 'Monochrome',
    colors: {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333',
      muted: '#f5f5f5',
      border: '#e5e5e5',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      background: '#000000',
      foreground: '#ffffff',
      primary: '#ffffff',
      secondary: '#999999',
      accent: '#cccccc',
      muted: '#1a1a1a',
      border: '#333333',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      background: '#fafafa',
      foreground: '#111111',
      primary: '#111111',
      secondary: '#777777',
      accent: '#444444',
      muted: '#eeeeee',
      border: '#dddddd',
    },
    typography: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
  },
};

export const defaultTheme = themes.monochrome;