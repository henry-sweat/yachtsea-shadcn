import { auth } from 'auth';
import Link from 'next/link';
import { signInServerAction } from '@/server/actions';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/google-icon';
import RulesButton from '@/components/rules-button';

export default async function LoadingScreen() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <main className='flex-1 flex flex-col justify-center items-center space-y-12 pb-32'>
      <div className='flex flex-col items-center'>
        <h1 className='text-5xl font-mono font-bold text-primary tracking-tight'>
          Yachtsea
        </h1>
        <p className='text-2xl text-muted-foreground tracking-tight'>
          Roll, Score, Repeat!
        </p>
      </div>
      <div className='w-48 flex flex-col space-y-3'>
        <Link href={'/play'} className='w-full'>
          <Button className='w-full' size={'xl'} variant={'default'}>
            Play
          </Button>
        </Link>
        <Link href={'/stats'} className='w-full'>
          <Button className='w-full border' size={'xl'} variant={'secondary'}>
            Stats
          </Button>
        </Link>
        <RulesButton />
        {session ? undefined : <SignInWithGoogleButton />}
      </div>
    </main>
  );
}

function SignInWithGoogleButton() {
  return (
    <form action={signInServerAction}>
      <Button className='w-full border' size={'xl'} variant={'secondary'}>
        <p className='mr-2'>Sign in with</p>
        <GoogleIcon />
      </Button>
    </form>
  );
}
