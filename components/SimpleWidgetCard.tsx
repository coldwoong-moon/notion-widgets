'use client';

import React, { useState } from 'react';
import { Widget, Theme } from '@/types/theme';

interface SimpleWidgetCardProps {
  widget: Widget;
  theme: Theme;
  baseUrl: string;
}

export function SimpleWidgetCard({ widget, theme, baseUrl }: SimpleWidgetCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}`;
  const WidgetComponent = widget.component;
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div 
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: isHovered ? '2px solid #3b82f6' : '2px solid #e5e7eb',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Preview */}
      <div style={{
        position: 'relative',
        minHeight: '200px',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          transform: 'scale(0.6)',
          transformOrigin: 'center'
        }}>
          <WidgetComponent theme={theme} />
        </div>
        
        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          color: '#3b82f6',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '500',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          {widget.category}
        </div>
      </div>
      
      {/* Widget Info */}
      <div style={{
        padding: '16px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>{widget.icon}</span>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            {widget.name}
          </h3>
        </div>
        
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px',
          flex: '1',
          lineHeight: '1.5'
        }}>
          {widget.description}
        </p>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          style={{
            width: '100%',
            padding: '8px 16px',
            backgroundColor: copied ? '#10b981' : '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }
          }}
          onMouseOut={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }
          }}
        >
          {copied ? '✓ Copied!' : '📋 Copy URL'}
        </button>
      </div>
    </div>
  );
}