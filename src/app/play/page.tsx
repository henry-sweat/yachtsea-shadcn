import Game from '@/components/game';
import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

export default async function Play() {
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
        className={`h-dvh overflow-auto flex flex-col-reverse items-center w-full mx-auto scroll-my-12 pt-4 pb-12`}
      >
        <Game />
        <Toaster />
      </main>
    </SessionProvider>
  );
}
