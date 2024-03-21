import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from 'auth';
import { signInServerAction } from '@/server/actions';
import { SessionProvider } from 'next-auth/react';
import StaticDie from '@/components/dice/static-die';
import GoogleIcon from '@/components/google-icon';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider session={session}>
      <main className='h-dvh flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center space-y-8 mb-16'>
          <div className='flex flex-col items-center space-y-3'>
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

          <div className='flex flex-col space-y-3 w-full'>
            <Link href={'/play'} className='w-full'>
              <Button className='w-full' size={'xl'} variant={'default'}>
                Play
              </Button>
            </Link>
            {session ? undefined : (
              <form action={signInServerAction}>
                <Button
                  className='w-full border'
                  size={'xl'}
                  variant={'secondary'}
                >
                  <GoogleIcon />
                  Sign in with Google
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </SessionProvider>
  );
}
