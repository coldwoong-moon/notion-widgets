'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface YearProgressProps {
  theme: Theme;
  locale?: Locale;
}

export function YearProgress({ theme, locale = 'en' }: YearProgressProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateProgress = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
      const yearProgress = ((now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())) * 100;
      setProgress(yearProgress);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} minHeight={280}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>{t('yearProgress.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  const currentYear = new Date().getFullYear();
  const daysElapsed = Math.floor((new Date().getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  const daysInYear = ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 366 : 365;
  const daysRemaining = daysInYear - daysElapsed;

  return (
    <WidgetContainer theme={theme} minHeight={280}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
        textAlign: 'center',
      }}>
        {/* Year title */}
        <h2 className="text-3xl" style={{
          color: theme.colors.primary,
          fontWeight: '700',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          {currentYear}
        </h2>
        
        <p className="text-sm" style={{
          color: theme.colors.secondary,
          opacity: 0.7,
          marginBottom: '32px',
        }}>
          {t('yearProgress.title', locale)}
        </p>

        {/* Progress percentage */}
        <div className="text-5xl" style={{
          color: theme.colors.primary,
          fontWeight: '300',
          marginBottom: '24px',
          fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
        }}>
          {progress.toFixed(1)}%
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '24px',
          backgroundColor: `${theme.colors.muted}40`,
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '24px',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
            borderRadius: '12px',
            transition: 'width 0.5s ease',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Animated shimmer effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite',
            }} />
          </div>
        </div>

        {/* Days info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '16px',
        }}>
          <div>
            <div className="text-2xl" style={{
              color: theme.colors.primary,
              fontWeight: '600',
              marginBottom: '4px',
            }}>
              {daysElapsed}
            </div>
            <div className="text-xs" style={{
              color: theme.colors.secondary,
              opacity: 0.7,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {t('yearProgress.daysPassed', locale)}
            </div>
          </div>

          <div style={{
            width: '1px',
            backgroundColor: theme.colors.border,
            opacity: 0.2,
          }} />

          <div>
            <div className="text-2xl" style={{
              color: theme.colors.accent,
              fontWeight: '600',
              marginBottom: '4px',
            }}>
              {daysRemaining}
            </div>
            <div className="text-xs" style={{
              color: theme.colors.secondary,
              opacity: 0.7,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {t('yearProgress.daysLeft', locale)}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    </WidgetContainer>
  );
}