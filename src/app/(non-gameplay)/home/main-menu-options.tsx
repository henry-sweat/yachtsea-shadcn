import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function MainMenuOptions() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Link href={'/stats'} className='w-full'>
          <Button className='w-full border' size={'xl'} variant={'secondary'}>
            Stats
          </Button>
        </Link>
        <Link href={'/stats'} className='w-full'>
          <Button className='w-full border' size={'xl'} variant={'secondary'}>
            Stats
          </Button>
        </Link>
      </>
    );
  }
}
