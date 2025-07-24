import { Locale } from '@/lib/i18n';

export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
  };
  styles?: {
    boxShadow?: string;
    borderRadius?: string;
    backdropFilter?: string;
    backgroundImage?: string;
  };
}

export interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // emoji or icon
  defaultSize: {
    width: number;
    height: number;
  };
  notion: {
    width: number;
    height: number;
  };
  component: React.ComponentType<{ theme: Theme; locale?: Locale; notion: { width: number; height: number } }>;
}