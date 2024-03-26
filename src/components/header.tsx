import Link from 'next/link';
import { auth } from 'auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { AvatarIcon } from '@radix-ui/react-icons';
import GoogleIcon from './google-icon';
import { signInServerAction, signOutServerAction } from '@/server/actions';
import StatsOrPlayLink from './stats-or-play-link';

export default async function Header() {
  const session = await auth();

  return (
    <header className='mx-auto w-full'>
      <div className='flex items-center justify-between px-5 py-2'>
        <div className='flex space-x-2 items-center'>
          <Link href={'/'}>
            <h1 className='text-xl font-semibold'>Yachtsea</h1>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session ? (
              <Avatar className='w-6 h-6'>
                {session.user?.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? ''}
                  />
                )}
                <AvatarFallback>{session.user?.email}</AvatarFallback>
              </Avatar>
            ) : (
              <AvatarIcon className='w-6 h-6' />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={24} align='end' alignOffset={-8}>
            <DropdownMenuLabel>
              {session ? session.user?.email : 'My Account'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href={'/'}>
              <DropdownMenuItem>Home</DropdownMenuItem>
            </Link>

            <StatsOrPlayLink />

            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {session ? (
                <form action={signOutServerAction} className='w-full'>
                  <button className='flex justify-between items-center w-full'>
                    <p>Sign out</p>
                  </button>
                </form>
              ) : (
                <form
                  action={signInServerAction}
                  className='bg-secondary w-full'
                >
                  <button className='flex justify-between items-center w-full'>
                    <GoogleIcon />
                    <div className='flex justify-center w-full'>
                      <p className='font-semibold'>Sign in</p>
                    </div>
                  </button>
                </form>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />
    </header>
  );
}
