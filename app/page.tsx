'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedWidgetCard } from '@/components/EnhancedWidgetCard';
import { widgets } from '@/lib/widgets';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { Locale, locales, localeNames } from '@/lib/i18n';
import { AdBanner } from '@/components/GoogleAdsense';

export default function Home() {
  const systemTheme = useSystemTheme();
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);
  
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

  // Handle language change
  const handleLanguageChange = (newLocale: Locale) => {
    setSelectedLocale(newLocale);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);
      window.history.pushState({}, '', url.toString());
      window.location.reload();
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes slideUp {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: systemTheme.colors.background,
      color: systemTheme.colors.foreground,
      fontFamily: systemTheme.typography.fontFamily,
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: systemTheme.id === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${systemTheme.colors.border}`,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 32px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: isMobile ? '60px' : '72px',
            gap: '16px',
          }}>
            {/* Logo and title */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              }}>
                ✨
              </div>
              <div>
                <h1 style={{
                  fontSize: isMobile ? '20px' : '24px',
                  fontWeight: '800',
                  color: systemTheme.colors.foreground,
                  margin: 0,
                  letterSpacing: '-0.025em',
                }}>
                  {t('gallery.title')}
                </h1>
                {!isMobile && (
                  <p style={{
                    fontSize: '14px',
                    color: systemTheme.colors.secondary,
                    margin: 0,
                  }}>
                    {t('gallery.subtitle')}
                  </p>
                )}
              </div>
            </div>
            
            {/* Language Switcher */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px' 
            }}>
              <select
                value={selectedLocale}
                onChange={(e) => handleLanguageChange(e.target.value as Locale)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${systemTheme.colors.border}`,
                  backgroundColor: systemTheme.colors.background,
                  color: systemTheme.colors.foreground,
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {locales.map((loc) => (
                  <option key={loc} value={loc}>
                    {localeNames[loc]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <nav style={{
        position: 'sticky',
        top: isMobile ? '60px' : '72px',
        zIndex: 90,
        backgroundColor: systemTheme.id === 'dark'
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${systemTheme.colors.border}`,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '12px 16px' : '16px 32px',
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            paddingBottom: '4px',
          }}>
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: selectedCategory === category 
                    ? systemTheme.colors.primary 
                    : 'transparent',
                  color: selectedCategory === category 
                    ? systemTheme.colors.background 
                    : systemTheme.colors.secondary,
                  border: selectedCategory === category
                    ? 'none'
                    : `1px solid ${systemTheme.colors.border}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0,
                  animation: `fadeIn 0.3s ease-out ${index * 0.05}s forwards`,
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.color = '#0f172a';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span style={{
                  fontSize: '12px',
                  opacity: 0.7,
                  backgroundColor: selectedCategory === category 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}>
                  {category === 'all' 
                    ? widgets.length 
                    : widgets.filter(w => w.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '24px 16px' : '40px 32px',
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          opacity: 0,
          animation: 'fadeIn 0.6s ease-out 0.2s forwards',
        }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: systemTheme.colors.foreground,
            marginBottom: '16px',
            letterSpacing: '-0.025em',
          }}>
            {t('gallery.title')}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: systemTheme.colors.secondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Widget Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: isMobile ? '16px' : '24px',
          width: '100%',
        }}>
          {filteredWidgets.map((widget, index) => (
            <React.Fragment key={widget.id}>
              <div
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                }}
              >
                <EnhancedWidgetCard
                  widget={widget}
                  theme={systemTheme}
                  baseUrl={baseUrl}
                  locale={locale}
                />
              </div>
              {/* Display ad after every 3rd widget on desktop, every 2nd on mobile */}
              {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && 
               ((isMobile && index === 1) || (!isMobile && index === 2)) && (
                <div style={{
                  gridColumn: isMobile ? '1' : 'span 1',
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${(index + 1) * 0.05}s forwards`,
                }}>
                  <div style={{
                    backgroundColor: systemTheme.colors.background,
                    border: `1px solid ${systemTheme.colors.border}`,
                    borderRadius: '16px',
                    padding: '20px',
                    height: '100%',
                    minHeight: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <AdBanner 
                      dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_GALLERY || "YOUR_AD_SLOT_ID"}
                      dataAdFormat="fluid"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Empty State */}
        {filteredWidgets.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out forwards',
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              opacity: 0.5,
            }}>
              🔍
            </div>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              marginBottom: '24px',
            }}>
              No widgets found in this category
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              View All Widgets
            </button>
          </div>
        )}

        {/* Ad Banner before How to Use Section */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <div style={{
            marginTop: '64px',
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: systemTheme.colors.background,
            border: `1px solid ${systemTheme.colors.border}`,
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <AdBanner 
              dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || "YOUR_HORIZONTAL_AD_SLOT_ID"}
              dataAdFormat="horizontal"
              style={{ minHeight: '90px' }}
            />
          </div>
        )}

        {/* How to Use Section */}
        <section style={{
          marginTop: '96px',
          paddingTop: '64px',
          borderTop: `1px solid ${systemTheme.colors.border}`,
          opacity: 0,
          animation: 'fadeIn 0.6s ease-out 0.4s forwards',
        }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '32px',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '48px',
            color: systemTheme.colors.foreground,
            letterSpacing: '-0.025em',
          }}>
            {t('gallery.embedInNotion')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '24px' : '32px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {[
              {
                icon: '🎯',
                title: 'Choose a Widget',
                description: 'Browse our collection and find the perfect widget for your needs',
                color: '#8b5cf6',
              },
              {
                icon: '📋',
                title: 'Copy the URL',
                description: 'Click the Copy URL button to get the widget embed link',
                color: '#3b82f6',
              },
              {
                icon: '✨',
                title: 'Embed in Notion',
                description: 'Type /embed in Notion and paste the URL to add your widget',
                color: '#10b981',
              },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: '16px',
                  backgroundColor: systemTheme.colors.background,
                  border: `1px solid ${systemTheme.colors.border}`,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = step.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {/* Step number */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#64748b',
                }}>
                  {index + 1}
                </div>
                
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 20px',
                  borderRadius: '16px',
                  backgroundColor: `${step.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
                >
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#0f172a',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          marginTop: '96px',
          textAlign: 'center',
          opacity: 0,
          animation: 'fadeIn 0.6s ease-out 0.6s forwards',
        }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '32px',
            fontWeight: '800',
            marginBottom: '48px',
            color: '#0f172a',
            letterSpacing: '-0.025em',
          }}>
            Why Choose Our Widgets?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {[
              { 
                title: 'No Setup Required', 
                desc: 'Just copy and paste - works instantly',
                icon: '⚡'
              },
              { 
                title: 'Beautiful Themes', 
                desc: 'Multiple color themes to match your style',
                icon: '🎨'
              },
              { 
                title: 'Responsive Design', 
                desc: 'Looks great on any device or screen size',
                icon: '📱'
              },
              { 
                title: 'Always Free', 
                desc: 'All widgets are completely free to use',
                icon: '🎁'
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '4px',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: '1.5',
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '96px',
        padding: isMobile ? '32px 16px' : '48px 32px',
        borderTop: `1px solid ${systemTheme.colors.border}`,
        backgroundColor: systemTheme.colors.background,
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div style={{
            marginBottom: '24px',
          }}>
            <p style={{
              fontSize: '15px',
              color: systemTheme.colors.secondary,
              marginBottom: '12px',
            }}>
              Made with ❤️ for Notion users everywhere
            </p>
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <a 
                href="https://github.com/coldwoong-moon/notion-widgets"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: '#0f172a',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#0f172a';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View on GitHub
              </a>
              <a 
                href="/privacy"
                style={{
                  fontSize: '14px',
                  color: systemTheme.colors.foreground,
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = systemTheme.colors.primary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = systemTheme.colors.foreground;
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="/terms"
                style={{
                  fontSize: '14px',
                  color: systemTheme.colors.foreground,
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = systemTheme.colors.primary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = systemTheme.colors.foreground;
                }}
              >
                Terms of Service
              </a>
            </div>
          </div>
          <p style={{
            fontSize: '13px',
            color: systemTheme.colors.muted,
            margin: 0,
          }}>
            © 2024 Notion Widgets. Not affiliated with Notion.
          </p>
        </div>
      </footer>
    </div>
  );
}