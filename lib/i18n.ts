export type Locale = 'en' | 'ko' | 'ja' | 'zh' | 'es' | 'fr' | 'de';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export function getLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLocale = urlParams.get('lang') as Locale;
  if (urlLocale && locales.includes(urlLocale)) {
    return urlLocale;
  }
  
  // Then check browser language
  const browserLang = navigator.language.split('-')[0] as Locale;
  if (locales.includes(browserLang)) {
    return browserLang;
  }
  
  return defaultLocale;
}