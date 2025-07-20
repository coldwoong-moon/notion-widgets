'use client';

import React, { useState, useEffect } from 'react';
import { Theme } from '@/types/theme';

interface QuoteProps {
  theme: Theme;
}

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
];

export function Quote({ theme }: QuoteProps) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const isNeumorphism = theme.id.includes('neumorphism');
  const isGlassmorphism = theme.id.includes('glassmorphism');

  return (
    <div
      className="flex items-center justify-center h-full p-8"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily,
        ...(isGlassmorphism && {
          backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        }),
      }}
    >
      <div
        className="text-center p-8 rounded-2xl max-w-lg"
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
        <div className="text-6xl mb-4 opacity-20">❝</div>
        <blockquote
          className="text-lg font-light italic mb-4"
          style={{ color: theme.colors.primary }}
        >
          {currentQuote.text}
        </blockquote>
        <cite
          className="text-sm"
          style={{ color: theme.colors.secondary }}
        >
          — {currentQuote.author}
        </cite>
      </div>
    </div>
  );
}