'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface QuoteProps {
  theme: Theme;
  locale?: Locale;
}

const quotesEn = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

const quotesKo = [
  { text: "위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.", author: "스티브 잡스", original: "The only way to do great work is to love what you do." },
  { text: "혁신은 리더와 추종자를 구분합니다.", author: "스티브 잡스", original: "Innovation distinguishes between a leader and a follower." },
  { text: "항상 갈망하고, 항상 우직하게 나아가라.", author: "스티브 잡스", original: "Stay hungry, stay foolish." },
  { text: "미래는 자신의 꿈의 아름다움을 믿는 사람들의 것입니다.", author: "엘리너 루스벨트", original: "The future belongs to those who believe in the beauty of their dreams." },
  { text: "가장 어두운 순간에 우리는 빛을 보기 위해 집중해야 합니다.", author: "아리스토텔레스", original: "It is during our darkest moments that we must focus to see the light." },
  { text: "성공은 최종적인 것이 아니며, 실패는 치명적이지 않습니다. 중요한 것은 계속할 수 있는 용기입니다.", author: "윈스턴 처칠", original: "Success is not final, failure is not fatal: it is the courage to continue that counts." },
  { text: "나무를 심기에 가장 좋은 때는 20년 전이었습니다. 두 번째로 좋은 때는 바로 지금입니다.", author: "중국 속담", original: "The best time to plant a tree was 20 years ago. The second best time is now." },
  { text: "당신의 시간은 제한되어 있으니, 다른 사람의 삶을 사느라 낭비하지 마십시오.", author: "스티브 잡스", original: "Your time is limited, don't waste it living someone else's life." },
];

interface QuoteType {
  text: string;
  author: string;
  original?: string;
}

export function Quote({ theme, locale = 'en' }: QuoteProps) {
  const quotes: QuoteType[] = locale === 'ko' ? quotesKo : quotesEn;
  const [currentQuote, setCurrentQuote] = useState<QuoteType>(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setIsAnimating(false);
      }, 300);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>{t('quote.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer theme={theme}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '32px',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Quote decoration */}
        <div style={{
          fontSize: '4rem',
          lineHeight: 1,
          opacity: 0.08,
          color: theme.colors.accent,
          position: 'absolute',
          top: '0',
          left: '32px',
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
        }}>
          ❝
        </div>
        
        {/* Quote content */}
        <div style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
        }}>
          <blockquote
            className="text-xl"
            style={{
              color: theme.colors.primary,
              fontWeight: '300',
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: '12px',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.02em',
            }}
          >
            &ldquo;{currentQuote.text}&rdquo;
          </blockquote>

          {locale === 'ko' && 'original' in currentQuote && (
            <p className="text-xs" style={{
              color: theme.colors.secondary,
              opacity: 0.6,
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              {currentQuote.original}
            </p>
          )}
          
          <cite
            className="text-sm"
            style={{
              color: theme.colors.secondary,
              fontStyle: 'normal',
              opacity: 0.8,
              display: 'block',
              fontWeight: '500',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
            }}
          >
            — {currentQuote.author}
          </cite>
        </div>

        {/* Progress indicator */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '2px',
          backgroundColor: `${theme.colors.border}40`,
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.accent,
            animation: 'progress 10s linear infinite',
            transformOrigin: 'left',
          }} />
        </div>

        <style>{`
          @keyframes progress {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </WidgetContainer>
  );
}