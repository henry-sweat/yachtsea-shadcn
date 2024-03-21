import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from 'auth';
import { signInServerAction } from '@/server/actions';
import { SessionProvider } from 'next-auth/react';
import StaticDie from '@/components/dice/static-die';
import GoogleIcon from '@/components/google-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignOut } from '@/components/auth-components';

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
        <div className='flex flex-col justify-center items-center space-y-8 mb-16'>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='w-full border'
                    size={'xl'}
                    variant={'secondary'}
                  >
                    {/* <Avatar className='w-8 h-8'>
                      {session.user.image && (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name ?? ''}
                        />
                      )}
                      <AvatarFallback style={{ backgroundColor: 'white' }}>
                        {session.user.email[0]}
                      </AvatarFallback>
                    </Avatar> */}
                    <GoogleIcon />
                    <div className='flex flex-col justify-center'>
                      <p>{session.user.name}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-36' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {session.user.name}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground'>
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link href={'/'}>Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={'/stats'}>Stats</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      </main>
    </SessionProvider>
  );
}
