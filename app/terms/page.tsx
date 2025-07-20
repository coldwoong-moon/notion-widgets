import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Notion Widgets',
  description: 'Terms of service for Notion Widgets',
};

export default function TermsPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      color: '#333',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Terms of Service</h1>
      
      <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
      <p style={{ marginBottom: '16px' }}>
        By using Notion Widgets, you agree to be bound by these Terms of Service. If you do not agree to these
        terms, please do not use our service.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>2. Use License</h2>
      <p style={{ marginBottom: '16px' }}>
        Our widgets are provided free of charge for personal and commercial use. You may embed them in your
        Notion pages without attribution, though attribution is appreciated.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>3. Disclaimer</h2>
      <p style={{ marginBottom: '16px' }}>
        The widgets are provided "as is" without warranty of any kind. We do not guarantee that the widgets
        will be available at all times or that they will be error-free.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>4. Limitations</h2>
      <p style={{ marginBottom: '16px' }}>
        In no event shall Notion Widgets or its suppliers be liable for any damages arising out of the use
        or inability to use the widgets.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>5. Third-Party Services</h2>
      <p style={{ marginBottom: '16px' }}>
        Our service displays advertisements through Google AdSense. Your use of our service is also subject
        to Google's Terms of Service.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>6. Modifications</h2>
      <p style={{ marginBottom: '16px' }}>
        We reserve the right to modify these terms at any time. We will notify users of any changes by
        updating the "Last updated" date.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>7. Contact Information</h2>
      <p style={{ marginBottom: '16px' }}>
        For any questions regarding these terms, please contact us through our{' '}
        <a href="https://github.com/coldwoong-moon/notion-widgets" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
    </div>
  );
}