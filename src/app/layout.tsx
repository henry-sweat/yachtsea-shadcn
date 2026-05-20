import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StructuredData from '@/components/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Yachtsea - Free Online Yahtzee Game | No Download Needed',
    template: '%s | Yachtsea',
  },
  description:
    'Play Yahtzee online free. No download or installation required. Works offline on your phone. Roll the dice, score points, and compete for high scores. Best mobile dice game for iPhone and Android.',
  keywords: [
    'yahtzee',
    'play yahtzee',
    'yahtzee online',
    'online yahtzee',
    'free yahtzee',
    'yahtzee game',
    'dice game',
    'online dice game',
    'free dice game',
    'yahtzee app',
    'mobile dice game',
    'yachtsea',
    'no download game',
    'offline game',
    'browser game',
  ],
  authors: [{ name: 'Yachtsea' }],
  creator: 'Yachtsea',
  publisher: 'Yachtsea',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yachtsea.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yachtsea.app',
    title: 'Yachtsea - Free Online Yahtzee Game',
    description:
      'Play Yahtzee online free. No download needed. Works offline. Roll the dice and compete for high scores!',
    siteName: 'Yachtsea',
    images: [
      {
        url: '/icons/apple-icon-1024.png',
        width: 1024,
        height: 1024,
        alt: 'Yachtsea - Online Dice Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yachtsea - Free Online Yahtzee Game',
    description:
      'Play Yahtzee online free. No download needed. Works offline. Roll the dice! 🎲',
    images: ['/icons/apple-icon-1024.png'],
    creator: '@yachtsea',
  },
  icons: {
    icon: '/icons/favicon.svg',
    apple: '/icons/apple-icon-1024.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Yachtsea',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  category: 'games',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <StructuredData />
      </head>
      <body className={`flex flex-col ${inter.className}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
