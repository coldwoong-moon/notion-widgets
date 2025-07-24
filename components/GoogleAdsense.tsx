'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleAdsenseProps {
  pId: string; // Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function GoogleAdsense({ pId }: GoogleAdsenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  style,
}: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdBanner error:', error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
        overflow: 'hidden',
        ...style,
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive}
    />
  );
}