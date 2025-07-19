'use client';

import React from 'react';
import { Theme } from '@/types/theme';

interface WeatherProps {
  theme: Theme;
}

export function Weather({ theme }: WeatherProps) {
  // Demo weather data - in production, this would come from an API
  const weatherData = {
    location: 'Seoul',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
  };

  return (
    <div
      className="p-6 h-full flex flex-col justify-center"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="text-center">
        <div
          className="text-lg font-light mb-2"
          style={{ color: theme.colors.secondary }}
        >
          {weatherData.location}
        </div>
        
        <div
          className="text-5xl font-light mb-2"
          style={{ color: theme.colors.primary }}
        >
          {weatherData.temperature}°
        </div>
        
        <div
          className="text-base mb-4"
          style={{ color: theme.colors.foreground }}
        >
          {weatherData.condition}
        </div>
        
        <div
          className="flex justify-center gap-6 text-sm"
          style={{ color: theme.colors.secondary }}
        >
          <div>
            <span className="font-medium">Humidity</span>
            <div>{weatherData.humidity}%</div>
          </div>
          <div>
            <span className="font-medium">Wind</span>
            <div>{weatherData.wind} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}