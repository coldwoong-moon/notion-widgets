'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Theme } from '@/types/theme';
import { WidgetContainer } from './WidgetContainer';
import { Locale } from '@/lib/i18n';
import { t } from '@/translations';

interface PomodoroProps {
  theme: Theme;
  locale?: Locale;
  notion: {
    width: number;
    height: number;
  };
}

type Mode = 'work' | 'shortBreak' | 'longBreak';

export function Pomodoro({ theme, locale = 'en', notion }: PomodoroProps) {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const modes: Record<Mode, { time: number, label: string }> = {
    work: { time: 25 * 60, label: t('pomodoro.work', locale) },
    shortBreak: { time: 5 * 60, label: t('pomodoro.shortBreak', locale) },
    longBreak: { time: 15 * 60, label: t('pomodoro.longBreak', locale) },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Play sound or notification could go here
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].time);
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(modes[newMode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 100 - (timeLeft / modes[mode].time) * 100;

  if (!mounted) {
    return (
      <WidgetContainer theme={theme} notion={notion}>
        <div style={{ textAlign: 'center', opacity: 0.1 }}>Loading...</div>
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
        padding: '16px',
      }}>
        {/* Mode Switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          backgroundColor: `${theme.colors.muted}15`,
          padding: '4px',
          borderRadius: '20px',
        }}>
          {(Object.keys(modes) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                background: mode === m ? theme.colors.primary : 'transparent',
                color: mode === m ? theme.colors.background : theme.colors.secondary,
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {modes[m].label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          {/* Circular Progress Background */}
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={`${theme.colors.border}30`}
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={theme.colors.accent}
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          {/* Time Text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3.5rem',
            fontWeight: '300',
            color: theme.colors.primary,
            fontFamily: '"SF Mono", monospace',
            letterSpacing: '-0.02em',
          }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={toggleTimer}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isActive ? `${theme.colors.muted}20` : theme.colors.primary,
              color: isActive ? theme.colors.primary : theme.colors.background,
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? 'none' : '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {isActive ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button
            onClick={resetTimer}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: `2px solid ${theme.colors.border}40`,
              backgroundColor: 'transparent',
              color: theme.colors.secondary,
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>
        </div>
      </div>
    </WidgetContainer>
  );
}
