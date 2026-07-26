import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'ToolHive - Free Online Utility Tools',
    template: '%s | ToolHive',
  },
  description: 'Free online utility tools: calculators, generators, converters, text tools, encoders and more. Fast, free, no sign-up required.',
  keywords: ['online tools', 'free tools', 'utility tools', 'calculators', 'generators', 'converters', 'text tools', 'password generator', 'bmi calculator', 'qr code generator'],
  openGraph: {
    title: 'ToolHive - Free Online Utility Tools',
    description: 'Free online utility tools: calculators, generators, converters, text tools, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ToolHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolHive - Free Online Utility Tools',
    description: 'Free online utility tools: calculators, generators, converters, text tools, and more.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'ToolHive' },
  other: {
    'color-scheme': 'light dark',
  },
};

export const viewport = {
  themeColor: '#0c8ee9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased" style={{ background: 'var(--bg)' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
