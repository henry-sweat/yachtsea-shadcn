'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/google-icon';
import { signInServerAction } from '@/server/actions';
import { useSession } from 'next-auth/react';
import useGameStore from '@/state';

export default function MainMenuOptions() {
  const { data: session } = useSession();
  const handleShowRulesButtonClicked = useGameStore(
    (state) => state.handleShowRulesButtonClicked
  );
  if (session) {
    return (
      <>
        <Link href={'/stats'} className='w-full'>
          <Button className='w-full border' size={'xl'} variant={'secondary'}>
            Stats
          </Button>
        </Link>

        <Button
          className='w-full border'
          size={'xl'}
          variant={'secondary'}
          onClick={handleShowRulesButtonClicked}
        >
          Rules
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          className='w-full border'
          size={'xl'}
          variant={'secondary'}
          onClick={handleShowRulesButtonClicked}
        >
          Rules
        </Button>
        <form action={signInServerAction}>
          <Button className='w-full border' size={'xl'} variant={'secondary'}>
            <p className='mr-2'>Sign in with</p>
            <GoogleIcon />
          </Button>
        </form>
      </>
    );
  }
}
