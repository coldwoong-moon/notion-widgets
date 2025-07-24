'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Widget, Theme } from '@/types/theme';
import { Locale } from '@/lib/i18n';
import { t, TranslationKey } from '@/translations';

interface EnhancedWidgetCardProps {
  widget: Widget;
  theme: Theme;
  baseUrl: string;
  locale?: Locale;
}

export function EnhancedWidgetCard({ widget, theme, baseUrl, locale = 'en' }: EnhancedWidgetCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}&lang=${locale}`;
  const WidgetComponent = widget.component;
  
  useEffect(() => {
    // Simulate preview loading
    const timer = setTimeout(() => setIsPreviewLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      
      // Visual feedback
      if (cardRef.current) {
        cardRef.current.style.animation = 'pulse 0.5s ease-out';
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.animation = '';
          }
        }, 500);
      }
      
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = widgetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCopy(e as unknown as React.MouseEvent);
    }
  };

  return (
    <article 
      ref={cardRef}
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: '16px',
        overflow: 'hidden',
        border: (isHovered || isFocused) ? '2px solid #3b82f6' : '2px solid transparent',
        boxShadow: (isHovered || isFocused) 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transform: (isHovered || isFocused) ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        outline: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="article"
      aria-label={`${widget.name} widget - ${widget.description}`}
      onKeyDown={handleKeyDown}
    >
      {/* Widget Preview with loading state */}
      <div style={{
        position: 'relative',
        height: 'auto',
        aspectRatio: `${widget.notion.width} / ${widget.notion.height}`,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Loading skeleton */}
        {!isPreviewLoaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '60%',
              height: '60%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              animation: 'shimmer 1.5s infinite',
            }} />
          </div>
        )}
        
        {/* Actual widget preview */}
        <div style={{
          transform: 'scale(0.7)',
          transformOrigin: 'center',
          opacity: isPreviewLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}>
          <WidgetComponent theme={theme} notion={widget.notion} />
        </div>
        
        {/* Interactive overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }} />
        
        {/* Category badge with better positioning */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          color: '#1f2937',
          padding: '6px 12px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span style={{ 
            width: '6px', 
            height: '6px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '50%',
            display: 'inline-block' 
          }} />
          {widget.category}
        </div>
      </div>
      
      {/* Widget Info with better spacing */}
      <div style={{
        padding: '20px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {/* Title with icon */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ 
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
          }}>
            {widget.icon}
          </span>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: theme.colors.foreground,
            margin: 0,
            letterSpacing: '-0.025em',
          }}>
            {t(`widget.${widget.id}` as TranslationKey, locale)}
          </h3>
        </header>
        
        {/* Description with better typography */}
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          flex: '1',
          margin: 0,
        }}>
          {widget.description}
        </p>
        
        {/* Action buttons with better design */}
        <footer style={{
          display: 'flex',
          gap: '8px',
          marginTop: '8px',
        }}>
          {/* Copy Button - Primary action */}
          <button
            onClick={handleCopy}
            style={{
              flex: '1',
              padding: '12px 20px',
              backgroundColor: copied ? '#10b981' : '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            aria-label={copied ? 'URL copied to clipboard' : 'Copy widget URL'}
          >
            {/* Button content with animation */}
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: copied ? 'slideUp 0.3s ease-out' : 'none',
            }}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('gallery.urlCopied', locale)}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 11V3H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {t('gallery.copyUrl', locale)}
                </>
              )}
            </span>
          </button>
          
          {/* Preview button - Secondary action */}
          <button
            onClick={() => window.open(widgetUrl, '_blank')}
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
              e.currentTarget.style.color = '#111827';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#6b7280';
            }}
            aria-label="Preview widget in new tab"
            title={t('gallery.preview', locale)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V10M10 2H14M14 2V6M14 2L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </footer>
      </div>
      
      {/* Keyboard focus indicator */}
      {isFocused && (
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '18px',
          border: '2px solid #3b82f6',
          pointerEvents: 'none',
        }} />
      )}
    </article>
  );
}