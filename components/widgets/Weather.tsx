'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface WeatherProps {
  theme: Theme;
  locale?: Locale;
}

export function Weather({ theme, locale = 'en' }: WeatherProps) {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'Partly Cloudy',
    location: 'San Francisco',
    humidity: 65,
    wind: 12,
    icon: '⛅',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate weather variations
    const interval = setInterval(() => {
      const conditions = [
        { condition: 'Sunny', icon: '☀️', temp: 25 },
        { condition: 'Partly Cloudy', icon: '⛅', temp: 22 },
        { condition: 'Cloudy', icon: '☁️', temp: 18 },
        { condition: 'Rainy', icon: '🌧️', temp: 16 },
        { condition: 'Thunderstorm', icon: '⛈️', temp: 15 },
      ];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather(prev => ({
        ...prev,
        ...randomCondition,
        humidity: 50 + Math.floor(Math.random() * 40),
        wind: 5 + Math.floor(Math.random() * 20),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} minHeight={280}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>{t('weather.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer theme={theme} minHeight={280}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        position: 'relative',
      }}>
        {/* Background gradient based on weather */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          background: weather.condition.includes('Sunny') 
            ? 'radial-gradient(circle at top, #FDB813 0%, transparent 70%)'
            : weather.condition.includes('Rain') || weather.condition.includes('Thunder')
              ? 'radial-gradient(circle at top, #4A90E2 0%, transparent 70%)'
              : 'radial-gradient(circle at top, #B8C6DB 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Location */}
        <div className="text-sm" style={{
          color: theme.colors.secondary,
          opacity: 0.7,
          marginBottom: '8px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        }}>
          {weather.location}
        </div>

        {/* Weather icon and temperature */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '4rem',
            lineHeight: 1,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}>
            {weather.icon}
          </div>
          <div>
            <div className="text-5xl" style={{
              color: theme.colors.primary,
              fontWeight: '300',
              lineHeight: 1,
            }}>
              {weather.temp}°
            </div>
            <div className="text-base" style={{
              color: theme.colors.secondary,
              marginTop: '4px',
            }}>
              {weather.condition}
            </div>
          </div>
        </div>

        {/* Additional weather info */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginTop: '8px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}>
            <div style={{
              fontSize: '1.25rem',
              opacity: 0.7,
            }}>
              💧
            </div>
            <div className="text-sm" style={{
              color: theme.colors.secondary,
              opacity: 0.8,
            }}>
              {weather.humidity}%
            </div>
            <div className="text-xs" style={{
              color: theme.colors.muted,
              opacity: 0.6,
            }}>
              {t('weather.humidity', locale)}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}>
            <div style={{
              fontSize: '1.25rem',
              opacity: 0.7,
            }}>
              💨
            </div>
            <div className="text-sm" style={{
              color: theme.colors.secondary,
              opacity: 0.8,
            }}>
              {weather.wind} km/h
            </div>
            <div className="text-xs" style={{
              color: theme.colors.muted,
              opacity: 0.6,
            }}>
              {t('weather.wind', locale)}
            </div>
          </div>
        </div>

        {/* Update time */}
        <div className="text-xs" style={{
          position: 'absolute',
          bottom: '16px',
          color: theme.colors.muted,
          opacity: 0.4,
        }}>
          {t('weather.updatedNow', locale)}
        </div>
      </div>
    </WidgetContainer>
  );
}