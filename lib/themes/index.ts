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
      background: '#0a0a0a',
      foreground: '#ffffff',
      primary: '#ffffff',
      secondary: '#a0a0a0',
      accent: '#d0d0d0',
      muted: '#1a1a1a',
      border: '#2a2a2a',
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
  neumorphismLight: {
    id: 'neumorphismLight',
    name: 'Neumorphism Light',
    colors: {
      background: '#e0e0e0',
      foreground: '#333333',
      primary: '#4a4a4a',
      secondary: '#666666',
      accent: '#5a5a5a',
      muted: '#e0e0e0',
      border: 'transparent',
    },
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
    styles: {
      boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
      borderRadius: '20px',
    },
  },
  neumorphismDark: {
    id: 'neumorphismDark',
    name: 'Neumorphism Dark',
    colors: {
      background: '#1a1a1a',
      foreground: '#e0e0e0',
      primary: '#ffffff',
      secondary: '#b0b0b0',
      accent: '#d0d0d0',
      muted: '#1a1a1a',
      border: 'transparent',
    },
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
    styles: {
      boxShadow: '20px 20px 60px #0f0f0f, -20px -20px 60px #252525',
      borderRadius: '20px',
    },
  },
  glassmorphismLight: {
    id: 'glassmorphismLight',
    name: 'Glassmorphism Light',
    colors: {
      background: 'rgba(255, 255, 255, 0.7)',
      foreground: '#1a1a1a',
      primary: '#000000',
      secondary: '#4a4a4a',
      accent: '#2a2a2a',
      muted: 'rgba(255, 255, 255, 0.5)',
      border: 'rgba(255, 255, 255, 0.3)',
    },
    typography: {
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
    styles: {
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
    },
  },
  glassmorphismDark: {
    id: 'glassmorphismDark',
    name: 'Glassmorphism Dark',
    colors: {
      background: 'rgba(0, 0, 0, 0.7)',
      foreground: '#ffffff',
      primary: '#ffffff',
      secondary: '#d0d0d0',
      accent: '#e0e0e0',
      muted: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
    },
    typography: {
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
    },
    styles: {
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
    },
  },
};

export const defaultTheme = themes.monochrome;