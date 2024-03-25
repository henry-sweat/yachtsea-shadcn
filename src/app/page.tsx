import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from 'auth';
import { signInServerAction } from '@/server/actions';
import { SessionProvider } from 'next-auth/react';
import StaticDie from '@/components/dice/static-die';
import GoogleIcon from '@/components/google-icon';
import LoggedInAsToaster from '@/components/logged-in-as-toaster';
import SettingsButton from '@/components/settings-button';

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
        {session ? (
          <div className='absolute top-5 left-5'>
            <SettingsButton />
          </div>
        ) : undefined}

        <div className='flex flex-col justify-center items-center space-y-8 mb-12'>
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
            {session ? (
              <Link href={'/stats'} className='w-full'>
                <Button
                  className='w-full border'
                  size={'xl'}
                  variant={'secondary'}
                >
                  Stats
                </Button>
              </Link>
            ) : (
              <form action={signInServerAction}>
                <Button
                  className='w-full border'
                  size={'xl'}
                  variant={'secondary'}
                >
                  <p className='mr-2'>Sign in with</p>
                  <GoogleIcon />
                </Button>
              </form>
            )}
          </div>
        </div>
        <LoggedInAsToaster />
      </main>
    </SessionProvider>
  );
}
