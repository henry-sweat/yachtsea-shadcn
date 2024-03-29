import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { AvatarIcon } from '@radix-ui/react-icons';
import GoogleIcon from './google-icon';
import StatsOrPlayLink from './stats-or-play-link';
import { signInServerAction, signOutServerAction } from '@/server/actions';
import { auth } from 'auth';
import HomeLink from './home-link';

export default async function UserButtonServerSide() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session ? (
          <Avatar className='w-8 h-8'>
            {session.user?.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ''}
              />
            )}
            <AvatarFallback>
              <AvatarIcon className='w-8 h-8' />
            </AvatarFallback>
          </Avatar>
        ) : (
          <AvatarIcon className='w-8 h-8' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align='end' alignOffset={-8}>
        <DropdownMenuLabel>
          {session ? session.user?.email : 'My Account'}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <HomeLink />
        <StatsOrPlayLink />
        <Link href={'/settings'}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        {session ? (
          <DropdownMenuItem>
            <form action={signOutServerAction} className='w-full'>
              <button className='flex justify-between items-center w-full'>
                <p>Sign out</p>
              </button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className='bg-secondary'>
            <form action={signInServerAction} className='w-full'>
              <button className='flex justify-between items-center w-full'>
                <GoogleIcon />
                <div className='flex justify-center w-full'>
                  <p className='font-semibold'>Sign in</p>
                </div>
              </button>
            </form>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
