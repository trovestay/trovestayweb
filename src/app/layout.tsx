import type { Viewport, Metadata } from 'next';
import './globals.css';
import LayoutShell from '../components/LayoutShell';
import PWAProvider from '../components/PWAProvider';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';

export const viewport: Viewport = {
  themeColor: '#0c1015',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'TROVE STAY',
  description: 'Premium Bali Property Rentals',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TroveStay',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PWAProvider>
          <AuthProvider>
            <AppProvider>
              <LayoutShell>{children}</LayoutShell>
            </AppProvider>
          </AuthProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
