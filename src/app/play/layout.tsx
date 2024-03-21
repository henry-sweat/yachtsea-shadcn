import '../globals.css';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-dvh'>
      <Header />
      {children}
      <Toaster />
    </div>
  );
}
