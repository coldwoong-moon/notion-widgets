'use client';

import { useState, useEffect } from 'react';
import { Locale, getLocale } from '@/lib/i18n';
import { TranslationKey, t } from '@/translations';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  const translate = (key: TranslationKey): string => {
    return t(key, locale);
  };

  return { t: translate, locale };
}