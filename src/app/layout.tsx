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
  description: 'Free online utility tools: calculators, generators, converters, text tools, and more. Fast, free, no sign-up required.',
  keywords: ['online tools', 'free tools', 'utility tools', 'calculators', 'generators', 'converters', 'text tools'],
  openGraph: {
    title: 'ToolHive - Free Online Utility Tools',
    description: 'Free online utility tools: calculators, generators, converters, text tools, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ToolHive',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
