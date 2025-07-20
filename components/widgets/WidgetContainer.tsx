'use client';

import React, { useEffect, useState } from 'react';
import { Theme } from '@/types/theme';

interface WidgetContainerProps {
  children: React.ReactNode;
  theme: Theme;
  minHeight?: number;
}

export function WidgetContainer({ children, theme, minHeight = 280 }: WidgetContainerProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Determine size based on viewport
  const isSmall = dimensions.height < 400;
  const isMedium = dimensions.height >= 400 && dimensions.height < 600;

  return (
    <div style={{
      width: '100%',
      minHeight: `${minHeight}px`,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: isSmall ? '16px' : isMedium ? '24px' : '32px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .widget-content {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Responsive font sizes */
        @media (max-height: 400px) {
          .text-xs { font-size: 10px; }
          .text-sm { font-size: 12px; }
          .text-base { font-size: 14px; }
          .text-lg { font-size: 16px; }
          .text-xl { font-size: 18px; }
          .text-2xl { font-size: 20px; }
          .text-3xl { font-size: 24px; }
          .text-4xl { font-size: 28px; }
          .text-5xl { font-size: 32px; }
          .text-6xl { font-size: 36px; }
        }
        
        @media (min-height: 400px) and (max-height: 600px) {
          .text-xs { font-size: 12px; }
          .text-sm { font-size: 14px; }
          .text-base { font-size: 16px; }
          .text-lg { font-size: 18px; }
          .text-xl { font-size: 20px; }
          .text-2xl { font-size: 24px; }
          .text-3xl { font-size: 30px; }
          .text-4xl { font-size: 36px; }
          .text-5xl { font-size: 48px; }
          .text-6xl { font-size: 60px; }
        }
        
        @media (min-height: 600px) {
          .text-xs { font-size: 14px; }
          .text-sm { font-size: 16px; }
          .text-base { font-size: 18px; }
          .text-lg { font-size: 20px; }
          .text-xl { font-size: 24px; }
          .text-2xl { font-size: 30px; }
          .text-3xl { font-size: 36px; }
          .text-4xl { font-size: 48px; }
          .text-5xl { font-size: 60px; }
          .text-6xl { font-size: 72px; }
        }
      `}</style>
      <div className="widget-content" style={{ width: '100%', maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
}