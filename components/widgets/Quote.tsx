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

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
];

export function Quote({ theme, locale = 'en' }: QuoteProps) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
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
  }, []);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} minHeight={280}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>{t('quote.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer theme={theme} minHeight={280}>
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
              marginBottom: '20px',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.02em',
            }}
          >
            &ldquo;{currentQuote.text}&rdquo;
          </blockquote>
          
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