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
        className={`flex-1 flex flex-col-reverse w-full mx-auto scroll-my-12 pb-8 px-4`}
      >
        <Game />
      </main>
    </SessionProvider>
  );
}
