'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { SimpleWidgetCard } from '@/components/SimpleWidgetCard';
import { widgets } from '@/lib/widgets';

export default function Home() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(widgets.map(w => w.category))];
  
  // Filter widgets by category
  const filteredWidgets = selectedCategory === 'all' 
    ? widgets 
    : widgets.filter(w => w.category === selectedCategory);
  
  // Get the proper base URL for widget embeds
  const baseUrl = typeof window !== 'undefined' 
    ? process.env.NODE_ENV === 'production'
      ? 'https://coldwoong-moon.github.io/notion-widgets'
      : window.location.origin
    : '';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px'
          }}>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: 0
              }}>
                🎨 Notion Widget Gallery
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>
                Beautiful widgets for your Notion workspace
              </p>
            </div>
            
            {/* Theme Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', marginRight: '8px' }}>Theme:</span>
              {availableThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.primary,
                    border: currentTheme.id === theme.id ? '3px solid #111827' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  title={theme.name}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: selectedCategory === category ? '#111827' : '#f3f4f6',
                  color: selectedCategory === category ? '#ffffff' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span style={{
                  marginLeft: '8px',
                  fontSize: '12px',
                  opacity: 0.7
                }}>
                  ({category === 'all' ? widgets.length : widgets.filter(w => w.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {/* Widget Gallery Grid - 확실한 그리드 레이아웃 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {filteredWidgets.map((widget) => (
            <SimpleWidgetCard
              key={widget.id}
              widget={widget}
              theme={currentTheme}
              baseUrl={baseUrl}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredWidgets.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#6b7280'
          }}>
            <p>No widgets found in this category.</p>
          </div>
        )}

        {/* How to Use Section */}
        <div style={{
          marginTop: '80px',
          paddingTop: '48px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#111827'
          }}>
            How to Use
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                backgroundColor: '#ddd6fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                🎨
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#111827'
              }}>
                Choose a Widget
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Browse our gallery and select a widget that fits your needs
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                backgroundColor: '#fde68a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📋
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#111827'
              }}>
                Copy Widget URL
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Click the &quot;Copy URL&quot; button on any widget card
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                backgroundColor: '#a7f3d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                📝
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#111827'
              }}>
                Embed in Notion
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.5'
              }}>
                Type /embed in Notion and paste the URL
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '80px',
        padding: '32px 0',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            Made with ❤️ for Notion users
          </p>
          <a 
            href="https://github.com/coldwoong-moon/notion-widgets"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '14px',
              color: '#6b7280',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}