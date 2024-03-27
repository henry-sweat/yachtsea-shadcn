import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from 'auth';
import { signInServerAction } from '@/server/actions';
import { SessionProvider } from 'next-auth/react';
import GoogleIcon from '@/components/google-icon';
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
        <div className='flex flex-col justify-center items-center space-y-8 mb-12'>
          <div className='w-[1/2] flex flex-col space-y-3 w-full'>
            <Link href={'/play'} className='w-full'>
              <Button className='w-full' size={'xl'} variant={'default'}>
                Play
              </Button>
            </Link>
            {/* {session ? (
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
            <Button className='w-full border' size={'xl'} variant={'secondary'}>
              <p>Rules</p>
            </Button> */}
          </div>
        </div>
        {/* <LoggedInAsToaster /> */}
      </main>
    </SessionProvider>
  );
}
