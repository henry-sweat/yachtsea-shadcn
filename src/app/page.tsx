import Game from '@/components/game';
import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';

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
      <main
        className={`fixed bottom-0 sm:relative sm:overflow-y-auto sm:h-[615px] sm:p-4 w-full flex flex-col flex-col-reverse items-center mx-auto scroll-my-12 x-hidden pb-4 px-4`}
      >
        <Game />
      </main>
    </SessionProvider>
  );
}
