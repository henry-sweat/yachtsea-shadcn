import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/header';
import { Toaster } from '@/components/ui/sonner';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <div className='flex flex-col h-screen'>
          <Header />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
