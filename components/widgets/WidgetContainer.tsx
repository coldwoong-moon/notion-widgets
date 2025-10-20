'use client';

import React, { useEffect, useState } from 'react';
import { Theme } from '@/types/theme';
import { NOTION_BORDER_RADIUS } from '@/lib/constants';

interface WidgetContainerProps {
  children: React.ReactNode;
  theme: Theme;
  notion: {
    width: number;
    height: number;
  };
}

export function WidgetContainer({ children, theme, notion }: WidgetContainerProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if we're embedded in an iframe (Notion)
    try {
      setIsEmbedded(window !== window.parent);
    } catch {
      // In some security contexts, accessing window.parent throws an error
      setIsEmbedded(false);
    }

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

  // Notion's typical embed width is constrained to page width (~900px max)
  // But most embeds are sized around 700-800px in practice
  const isSmall = dimensions.height < 300;
  const isMedium = dimensions.height >= 300 && dimensions.height < 450;

  // Notion-optimized padding - more compact for embedded view
  const padding = isSmall ? '16px' : isMedium ? '24px' : '32px';
  const aspectRatio = notion.width / notion.height;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      // Only apply aspectRatio when embedded to allow Notion to control the size
      // When standalone, parent container defines the size via defaultSize
      ...(isEmbedded && { aspectRatio: `${aspectRatio}` }),
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
      // Notion-optimized styling
      borderRadius: isEmbedded ? '0' : NOTION_BORDER_RADIUS,
      maxWidth: '100%',
      minHeight: '100%',
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
        
        /* Notion-optimized responsive font sizes based on container height */
        /* Small widgets (< 300px) - typical for compact Notion embeds */
        @container (max-height: 300px) {
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
        
        /* Medium widgets (300-450px) - standard Notion embed size */
        @container (min-height: 300px) and (max-height: 450px) {
          .text-xs { font-size: 11px; }
          .text-sm { font-size: 13px; }
          .text-base { font-size: 15px; }
          .text-lg { font-size: 18px; }
          .text-xl { font-size: 20px; }
          .text-2xl { font-size: 24px; }
          .text-3xl { font-size: 30px; }
          .text-4xl { font-size: 36px; }
          .text-5xl { font-size: 48px; }
          .text-6xl { font-size: 56px; }
        }
        
        /* Large widgets (> 450px) - expanded Notion embeds */
        @container (min-height: 450px) {
          .text-xs { font-size: 12px; }
          .text-sm { font-size: 14px; }
          .text-base { font-size: 16px; }
          .text-lg { font-size: 18px; }
          .text-xl { font-size: 20px; }
          .text-2xl { font-size: 26px; }
          .text-3xl { font-size: 32px; }
          .text-4xl { font-size: 42px; }
          .text-5xl { font-size: 52px; }
          .text-6xl { font-size: 64px; }
        }
        
        /* Fallback for browsers without container query support */
        @media (max-height: 300px) {
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
        
        @media (min-height: 300px) and (max-height: 450px) {
          .text-xs { font-size: 11px; }
          .text-sm { font-size: 13px; }
          .text-base { font-size: 15px; }
          .text-lg { font-size: 18px; }
          .text-xl { font-size: 20px; }
          .text-2xl { font-size: 24px; }
          .text-3xl { font-size: 30px; }
          .text-4xl { font-size: 36px; }
          .text-5xl { font-size: 48px; }
          .text-6xl { font-size: 56px; }
        }
        
        @media (min-height: 450px) {
          .text-xs { font-size: 12px; }
          .text-sm { font-size: 14px; }
          .text-base { font-size: 16px; }
          .text-lg { font-size: 18px; }
          .text-xl { font-size: 20px; }
          .text-2xl { font-size: 26px; }
          .text-3xl { font-size: 32px; }
          .text-4xl { font-size: 42px; }
          .text-5xl { font-size: 52px; }
          .text-6xl { font-size: 64px; }
        }
      `}</style>
      <div className="widget-content" style={{ width: '100%', maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
}