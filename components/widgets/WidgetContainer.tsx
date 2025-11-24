'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're embedded in an iframe (Notion)
    try {
      setIsEmbedded(window !== window.parent);
    } catch {
      // In some security contexts, accessing window.parent throws an error
      setIsEmbedded(false);
    }

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Use ResizeObserver for better height detection
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    } else {
      resizeObserver.observe(document.body);
    }

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
    <div
      ref={containerRef}
      style={{
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
        // Remove containerType as we're using JS-based classes
        // Notion-optimized styling
        borderRadius: isEmbedded ? '0' : NOTION_BORDER_RADIUS,
        maxWidth: '100%',
        minHeight: '100%',
      }}
      className={isSmall ? 'container-small' : isMedium ? 'container-medium' : 'container-large'}
    >
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
        
        /* Notion-optimized responsive font sizes based on container height classes */
        /* Small widgets (< 300px) */
        .container-small .text-xs { font-size: 10px; line-height: 1.1; }
        .container-small .text-sm { font-size: 12px; line-height: 1.1; }
        .container-small .text-base { font-size: 14px; line-height: 1.1; }
        .container-small .text-lg { font-size: 16px; line-height: 1.1; }
        .container-small .text-xl { font-size: 18px; line-height: 1.1; }
        .container-small .text-2xl { font-size: 20px; line-height: 1.1; }
        .container-small .text-3xl { font-size: 24px; line-height: 1.1; }
        .container-small .text-4xl { font-size: 26px; line-height: 1.1; }
        .container-small .text-5xl { font-size: 28px; line-height: 1.1; }
        .container-small .text-6xl { font-size: 32px; line-height: 1.1; }
        
        /* Medium widgets (300-450px) */
        .container-medium .text-xs { font-size: 11px; }
        .container-medium .text-sm { font-size: 13px; }
        .container-medium .text-base { font-size: 15px; }
        .container-medium .text-lg { font-size: 18px; }
        .container-medium .text-xl { font-size: 20px; }
        .container-medium .text-2xl { font-size: 24px; }
        .container-medium .text-3xl { font-size: 30px; }
        .container-medium .text-4xl { font-size: 36px; }
        .container-medium .text-5xl { font-size: 48px; }
        .container-medium .text-6xl { font-size: 56px; }
        
        /* Large widgets (> 450px) */
        .container-large .text-xs { font-size: 12px; }
        .container-large .text-sm { font-size: 14px; }
        .container-large .text-base { font-size: 16px; }
        .container-large .text-lg { font-size: 18px; }
        .container-large .text-xl { font-size: 20px; }
        .container-large .text-2xl { font-size: 26px; }
        .container-large .text-3xl { font-size: 32px; }
        .container-large .text-4xl { font-size: 42px; }
        .container-large .text-5xl { font-size: 52px; }
        .container-large .text-6xl { font-size: 64px; }
      `}</style>
      <div className="widget-content" style={{ width: '100%', maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  );
}
