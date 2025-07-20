import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Notion Widgets',
  description: 'Privacy policy for Notion Widgets',
};

export default function PrivacyPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: 1.6,
      color: '#333',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
      
      <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Information We Collect</h2>
      <p style={{ marginBottom: '16px' }}>
        We do not collect any personal information from users. The widgets operate entirely on the client-side
        and do not transmit any data to our servers.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Cookies</h2>
      <p style={{ marginBottom: '16px' }}>
        We use cookies only for language preference settings. These cookies are stored locally in your browser
        and are not used for tracking purposes.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Third-Party Services</h2>
      <p style={{ marginBottom: '16px' }}>
        We use Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to
        collect non-personal information. You can read more about Google's privacy practices at{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Data Storage</h2>
      <p style={{ marginBottom: '16px' }}>
        All widget data (such as countdown targets or weather locations) is stored locally in your browser's
        localStorage and is never transmitted to any server.
      </p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>Contact Us</h2>
      <p style={{ marginBottom: '16px' }}>
        If you have any questions about this Privacy Policy, please contact us through our{' '}
        <a href="https://github.com/coldwoong-moon/notion-widgets" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
    </div>
  );
}