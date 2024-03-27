'use client';

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
import { useSession } from 'next-auth/react';

export default function UserButton() {
  const { data: session } = useSession();

  return (
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
            <AvatarFallback>
              <AvatarIcon className='w-6 h-6' />
            </AvatarFallback>
          </Avatar>
        ) : (
          <AvatarIcon className='w-6 h-6' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={17} align='end' alignOffset={-30}>
        <DropdownMenuLabel>
          {session ? session.user?.email : 'My Account'}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href={'/'}>
          <DropdownMenuItem>Home</DropdownMenuItem>
        </Link>
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
