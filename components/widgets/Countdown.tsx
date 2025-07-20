'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface CountdownProps {
  theme: Theme;
  locale?: Locale;
}

export function Countdown({ theme, locale = 'en' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const targetDate = useMemo(() => new Date('2025-01-01T00:00:00'), []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} minHeight={280}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>{t('countdown.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: `${theme.colors.muted}20`,
      border: `1px solid ${theme.colors.border}30`,
      minWidth: '60px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Animated background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${theme.colors.primary}10 0%, transparent 100%)`,
        opacity: 0.5,
        pointerEvents: 'none',
      }} />
      
      <div
        className="text-3xl"
        style={{
          color: theme.colors.primary,
          fontWeight: '700',
          fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
          position: 'relative',
          letterSpacing: '-0.02em',
        }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div
        className="text-xs"
        style={{
          color: theme.colors.secondary,
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginTop: '4px',
          fontWeight: '500',
        }}
      >
        {label}
      </div>
    </div>
  );

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <WidgetContainer theme={theme} minHeight={280}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '24px',
        textAlign: 'center',
      }}>
        {/* Target title */}
        <h3
          className="text-base"
          style={{
            color: theme.colors.secondary,
            fontWeight: '500',
            marginBottom: '8px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          {t('countdown.to', locale)}
        </h3>
        <h2
          className="text-2xl"
          style={{
            color: theme.colors.primary,
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}
        >
          {t('countdown.newYear', locale)}
        </h2>

        {/* Countdown display */}
        {isExpired ? (
          <div style={{
            padding: '40px',
            borderRadius: '16px',
            backgroundColor: `${theme.colors.accent}10`,
            border: `2px solid ${theme.colors.accent}30`,
          }}>
            <div className="text-3xl" style={{
              color: theme.colors.accent,
              fontWeight: '700',
              marginBottom: '8px',
            }}>
              {t('countdown.expired', locale)}
            </div>
            <div className="text-base" style={{
              color: theme.colors.secondary,
              opacity: 0.8,
            }}>
              {t('countdown.ended', locale)}
            </div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <TimeUnit value={timeLeft.days} label={t('countdown.days', locale)} />
              <TimeUnit value={timeLeft.hours} label={t('countdown.hours', locale)} />
              <TimeUnit value={timeLeft.minutes} label={t('countdown.minutes', locale)} />
              <TimeUnit value={timeLeft.seconds} label={t('countdown.seconds', locale)} />
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: `${theme.colors.border}40`,
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '50%',
                background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                animation: 'shimmer 3s ease-in-out infinite',
              }} />
            </div>
          </>
        )}

        {/* Date info */}
        <div className="text-xs" style={{
          marginTop: '16px',
          color: theme.colors.muted,
          opacity: 0.6,
        }}>
          {t('countdown.target', locale)}: {targetDate.toLocaleDateString(locale === 'en' ? 'en-US' : locale, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    </WidgetContainer>
  );
}