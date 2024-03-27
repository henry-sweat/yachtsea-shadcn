import StaticDie from '@/components/dice/static-die';

export default async function LoadingScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-dvh'>
      <div
        id='loading-screen'
        className='h-full flex flex-col justify-center items-center space-y-8 mb-12'
      >
        <div className='fade-in flex flex-col items-center space-y-3'>
          <StaticDie />
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-mono font-bold text-primary tracking-tight'>
              Yachtsea
            </h1>
            <p className='text-2xl text-muted-foreground tracking-tight'>
              Roll, Score, Repeat!
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
