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

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅️', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '❓';
};

export function Weather({ theme, locale = 'en' }: WeatherProps) {
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    location: string;
    humidity: number;
    wind: number;
    icon: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchWeather = (lat: number, lon: number) => {
      if (!API_KEY) {
        setError("Weather API key is not configured.");
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${locale}`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            setWeather({
              temp: Math.round(data.main.temp),
              condition: data.weather[0].description,
              location: data.name,
              humidity: data.main.humidity,
              wind: Math.round(data.wind.speed),
              icon: getWeatherIcon(data.weather[0].icon),
            });
            setError(null);
          } else {
            setError(data.message);
          }
        })
        .catch(() => setError("Failed to fetch weather data."));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to IP-based location if geolocation is denied
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => fetchWeather(data.latitude, data.longitude))
            .catch(() => setError("Unable to retrieve location."));
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [locale]);

  if (!mounted || (!weather && !error)) {
    return (
      <WidgetContainer theme={theme}>
        <div style={{ textAlign: 'center', opacity: 0.5 }}>{t('weather.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer theme={theme}>
        <div style={{ textAlign: 'center', color: theme.colors.accent, padding: '20px' }}>
          <p>⚠️ {t('weather.error', locale)}</p>
          <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>{error}</p>
        </div>
      </WidgetContainer>
    );
  }

  if (!weather) return null;

  return (
    <WidgetContainer theme={theme}>
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
              textTransform: 'capitalize',
            }}>
              {weather.condition}
            </div>
          </div>
        </div>

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
            <div style={{ fontSize: '1.25rem', opacity: 0.7 }}>💧</div>
            <div className="text-sm" style={{ color: theme.colors.secondary, opacity: 0.8 }}>
              {weather.humidity}%
            </div>
            <div className="text-xs" style={{ color: theme.colors.muted, opacity: 0.6 }}>
              {t('weather.humidity', locale)}
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}>
            <div style={{ fontSize: '1.25rem', opacity: 0.7 }}>💨</div>
            <div className="text-sm" style={{ color: theme.colors.secondary, opacity: 0.8 }}>
              {weather.wind} m/s
            </div>
            <div className="text-xs" style={{ color: theme.colors.muted, opacity: 0.6 }}>
              {t('weather.wind', locale)}
            </div>
          </div>
        </div>

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