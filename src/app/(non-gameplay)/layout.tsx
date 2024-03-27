import Header from '@/components/header';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-dvh'>
      <Header />
      {children}
    </div>
  );
}
