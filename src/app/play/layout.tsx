import '../globals.css';
import { Toaster } from '@/components/ui/sonner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-dvh'>
      {children}
      <Toaster />
    </div>
  );
}
