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
}

export interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultSize: {
    width: number;
    height: number;
  };
  component: React.ComponentType<{ theme: Theme }>;
}