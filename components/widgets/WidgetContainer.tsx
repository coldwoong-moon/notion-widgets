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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Use ResizeObserver for better height detection
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        setDimensions(prev => ({ ...prev, height }));
      }
    });
    
    resizeObserver.observe(document.body);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  // Determine size based on viewport
  const isSmall = dimensions.height < 350;
  const isMedium = dimensions.height >= 350 && dimensions.height < 500;
  const isLarge = dimensions.height >= 500;

  // Calculate responsive padding
  const padding = isSmall ? '12px' : isMedium ? '20px' : '28px';

  return (
    <div style={{
      width: '100%',
      minHeight: `${minHeight}px`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
      fontFamily: theme.typography.fontFamily,
      padding: padding,
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      containerType: 'size',
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
        
        /* Responsive font sizes based on container height */
        @container (max-height: 350px) {
          .text-xs { font-size: 9px; }
          .text-sm { font-size: 11px; }
          .text-base { font-size: 13px; }
          .text-lg { font-size: 15px; }
          .text-xl { font-size: 17px; }
          .text-2xl { font-size: 19px; }
          .text-3xl { font-size: 22px; }
          .text-4xl { font-size: 26px; }
          .text-5xl { font-size: 30px; }
          .text-6xl { font-size: 34px; }
        }
        
        @container (min-height: 350px) and (max-height: 500px) {
          .text-xs { font-size: 11px; }
          .text-sm { font-size: 13px; }
          .text-base { font-size: 15px; }
          .text-lg { font-size: 17px; }
          .text-xl { font-size: 19px; }
          .text-2xl { font-size: 22px; }
          .text-3xl { font-size: 28px; }
          .text-4xl { font-size: 34px; }
          .text-5xl { font-size: 44px; }
          .text-6xl { font-size: 54px; }
        }
        
        @container (min-height: 500px) {
          .text-xs { font-size: 13px; }
          .text-sm { font-size: 15px; }
          .text-base { font-size: 17px; }
          .text-lg { font-size: 19px; }
          .text-xl { font-size: 22px; }
          .text-2xl { font-size: 28px; }
          .text-3xl { font-size: 34px; }
          .text-4xl { font-size: 44px; }
          .text-5xl { font-size: 56px; }
          .text-6xl { font-size: 68px; }
        }
        
        /* Fallback for browsers without container query support */
        @media (max-height: 350px) {
          .text-xs { font-size: 9px; }
          .text-sm { font-size: 11px; }
          .text-base { font-size: 13px; }
          .text-lg { font-size: 15px; }
          .text-xl { font-size: 17px; }
          .text-2xl { font-size: 19px; }
          .text-3xl { font-size: 22px; }
          .text-4xl { font-size: 26px; }
          .text-5xl { font-size: 30px; }
          .text-6xl { font-size: 34px; }
        }
        
        @media (min-height: 350px) and (max-height: 500px) {
          .text-xs { font-size: 11px; }
          .text-sm { font-size: 13px; }
          .text-base { font-size: 15px; }
          .text-lg { font-size: 17px; }
          .text-xl { font-size: 19px; }
          .text-2xl { font-size: 22px; }
          .text-3xl { font-size: 28px; }
          .text-4xl { font-size: 34px; }
          .text-5xl { font-size: 44px; }
          .text-6xl { font-size: 54px; }
        }
        
        @media (min-height: 500px) {
          .text-xs { font-size: 13px; }
          .text-sm { font-size: 15px; }
          .text-base { font-size: 17px; }
          .text-lg { font-size: 19px; }
          .text-xl { font-size: 22px; }
          .text-2xl { font-size: 28px; }
          .text-3xl { font-size: 34px; }
          .text-4xl { font-size: 44px; }
          .text-5xl { font-size: 56px; }
          .text-6xl { font-size: 68px; }
        }
      `}</style>
      <div className="widget-content" style={{ width: '100%', maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
}