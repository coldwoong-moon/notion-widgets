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
    icon: '☁️',
  };

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

  return (
    <div
      className="flex items-center justify-center h-full p-6"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
        ...(isGlassmorphism && {
          backgroundImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        }),
      }}
    >
      <div
        className="text-center p-6 rounded-2xl w-full max-w-xs"
        style={{
          backgroundColor: isGlassmorphism ? theme.colors.background : 'transparent',
          ...(theme.styles && {
            boxShadow: theme.styles.boxShadow,
            borderRadius: theme.styles.borderRadius,
            backdropFilter: theme.styles.backdropFilter,
            border: isGlassmorphism ? `1px solid ${theme.colors.border}` : 'none',
          }),
          ...(isNeumorphism && {
            backgroundColor: theme.colors.background,
          }),
        }}
      >
        <div className="text-6xl mb-2">{weatherData.icon}</div>
        
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
          <div
            className="flex flex-col items-center p-2 rounded-lg"
            style={{
              backgroundColor: isNeumorphism ? theme.colors.muted : 'transparent',
              ...(isNeumorphism && theme.styles && {
                boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
              }),
            }}
          >
            <span className="text-xs opacity-75">Humidity</span>
            <div className="font-medium">{weatherData.humidity}%</div>
          </div>
          <div
            className="flex flex-col items-center p-2 rounded-lg"
            style={{
              backgroundColor: isNeumorphism ? theme.colors.muted : 'transparent',
              ...(isNeumorphism && theme.styles && {
                boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
              }),
            }}
          >
            <span className="text-xs opacity-75">Wind</span>
            <div className="font-medium">{weatherData.wind} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}