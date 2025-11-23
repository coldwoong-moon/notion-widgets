'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface WeatherProps {
  theme: Theme;
  locale?: Locale;
  notion: {
    width: number;
    height: number;
  };
}

// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
const getWeatherIcon = (code: number) => {
  if (code === 0) return '☀️'; // Clear sky
  if (code === 1 || code === 2 || code === 3) return '⛅'; // Mainly clear, partly cloudy, and overcast
  if (code === 45 || code === 48) return '🌫️'; // Fog
  if (code >= 51 && code <= 55) return '🌧️'; // Drizzle
  if (code >= 61 && code <= 65) return '🌧️'; // Rain
  if (code >= 71 && code <= 77) return '❄️'; // Snow
  if (code >= 80 && code <= 82) return '🌧️'; // Rain showers
  if (code >= 85 && code <= 86) return '❄️'; // Snow showers
  if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
  return '❓';
};

const getWeatherCondition = (code: number, locale: Locale) => {
  // Simplified mapping, ideally should be translated
  const conditions: Record<number, string> = {
    0: t('weather.sunny', locale),
    1: t('weather.partlyCloudy', locale),
    2: t('weather.partlyCloudy', locale),
    3: t('weather.cloudy', locale),
    45: t('weather.fog', locale),
    48: t('weather.fog', locale),
    51: t('weather.rainy', locale),
    53: t('weather.rainy', locale),
    55: t('weather.rainy', locale),
    61: t('weather.rainy', locale),
    63: t('weather.rainy', locale),
    65: t('weather.rainy', locale),
    71: t('weather.snow', locale),
    73: t('weather.snow', locale),
    75: t('weather.snow', locale),
    77: t('weather.snow', locale),
    80: t('weather.rainy', locale),
    81: t('weather.rainy', locale),
    82: t('weather.rainy', locale),
    85: t('weather.snow', locale),
    86: t('weather.snow', locale),
    95: t('weather.thunderstorm', locale),
    96: t('weather.thunderstorm', locale),
    99: t('weather.thunderstorm', locale),
  };
  return conditions[code] || t('weather.partlyCloudy', locale);
};

export function Weather({ theme, locale = 'en', notion }: WeatherProps) {
  const [weather, setWeather] = useState({
    temp: 0,
    condition: '',
    location: 'Loading...',
    humidity: 0,
    wind: 0,
    icon: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number, locationName: string) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const data = await response.json();
        const current = data.current;

        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: getWeatherCondition(current.weather_code, locale),
          location: locationName,
          humidity: current.relative_humidity_2m,
          wind: Math.round(current.wind_speed_10m),
          icon: getWeatherIcon(current.weather_code),
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setError('Failed to load weather');
        setLoading(false);
      }
    };

    const getLocationAndFetchWeather = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // Reverse geocoding to get city name (using a free API or just coordinates)
            // For simplicity/privacy/no-api-key, we might just show coordinates or "My Location"
            // Or use a free reverse geocoding service if available.
            // For now, let's try to use a public IP-based location service as a fallback or primary if geo is denied,
            // but since this is client-side, we can use `nominatim.openstreetmap.org` for reverse geocoding (respecting usage policy).

            const { latitude, longitude } = position.coords;

            try {
              const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
              );
              const geoData = await geoResponse.json();
              const city = geoData.address.city || geoData.address.town || geoData.address.village || 'My Location';
              fetchWeather(latitude, longitude, city);
            } catch {
              fetchWeather(latitude, longitude, 'My Location');
            }
          },
          () => {
            // Fallback to a default location (e.g., London or New York) if permission denied
             // London
            fetchWeather(51.5074, -0.1278, 'London');
          }
        );
      } else {
        // Fallback for browsers without geolocation
        fetchWeather(51.5074, -0.1278, 'London');
      }
    };

    getLocationAndFetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(getLocationAndFetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [locale]);

  if (loading) {
    return (
      <WidgetContainer theme={theme} notion={notion}>
        <div style={{ textAlign: 'center', opacity: 0.5 }}>{t('weather.loading', locale)}</div>
      </WidgetContainer>
    );
  }

  if (error) {
    return (
      <WidgetContainer theme={theme} notion={notion}>
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer theme={theme} notion={notion}>
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
          background: weather.icon === '☀️'
            ? 'radial-gradient(circle at top, #FDB813 0%, transparent 70%)'
            : weather.icon === '🌧️' || weather.icon === '⛈️'
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
          marginTop: '24px',
          color: theme.colors.muted,
          opacity: 0.4,
        }}>
          {t('weather.updatedNow', locale)}
        </div>
      </div>
    </WidgetContainer>
  );
}