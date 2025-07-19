export function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  // For GitHub Pages deployment
  if (process.env.NODE_ENV === 'production') {
    return `https://coldwoong-moon.github.io/notion-widgets`;
  }
  
  return window.location.origin;
}