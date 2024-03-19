import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yachtsea',
  description: 'Ye Olde Dice Game',
  icons: {
    icon: '/icons/favicon.svg',
    apple: '/icons/apple-icon-1024.png',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} h-screen`}>
        <div className='flex flex-col h-screen'>
          <Header />
          {children}
          <Toaster />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
