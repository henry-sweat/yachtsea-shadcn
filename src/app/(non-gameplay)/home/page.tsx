import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import MainMenuOptions from './main-menu-options';
import RulesDrawer from '@/components/rules-drawer';

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
      <main className='h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-[200px] space-y-8 mb-12'>
          <div className='w-[1/2] flex flex-col space-y-3 w-full'>
            <Link href={'/play'} className='w-full'>
              <Button className='w-full' size={'xl'} variant={'default'}>
                Play
              </Button>
            </Link>
            <MainMenuOptions />
          </div>
        </div>
      </main>
      <RulesDrawer />
    </SessionProvider>
  );
}
