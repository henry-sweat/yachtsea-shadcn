import { auth } from 'auth';
import Link from 'next/link';
import { signInServerAction } from '@/server/actions';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/google-icon';
import RulesButton from '@/components/rules-button';
import HeroDiceAnimation from '@/components/landing/hero-dice-animation';
import SocialProof from '@/components/landing/social-proof';
import FeaturePills from '@/components/landing/feature-pills';

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
    <main className='flex-1 flex flex-col items-center px-6 pt-12 pb-40 overflow-y-auto min-h-screen'>
      <div className='w-full max-w-md flex flex-col items-center space-y-6'>
        {/* Animated Hero Dice */}
        <HeroDiceAnimation />

        {/* Title */}
        <h1 className='text-5xl sm:text-6xl font-mono font-bold text-primary tracking-tight'>
          YACHTSEA
        </h1>

        {/* Social Proof */}
        <SocialProof />

        {/* Giant Play CTA */}
        <Link href='/play' className='w-full' prefetch>
          <Button className='w-full h-16 text-xl' size='lg' variant='default'>
            Play Now →
          </Button>
        </Link>

        {/* Feature Pills */}
        <FeaturePills />

        {/* Secondary Actions */}
        <div className='w-full flex flex-col sm:flex-row gap-3 pt-4'>
          <Link href='/stats' className='flex-1'>
            <Button
              className='w-full border'
              size='lg'
              variant='secondary'
            >
              Stats
            </Button>
          </Link>
          <RulesButton />
        </div>

        {/* Sign In (Optional) */}
        {session ? null : (
          <div className='w-full pt-2'>
            <SignInWithGoogleButton />
          </div>
        )}
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
