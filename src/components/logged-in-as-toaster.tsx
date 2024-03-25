'use client';

import { useSession } from 'next-auth/react';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import GoogleIcon from './google-icon';

export default function LoggedInAsToaster() {
  const { data: session } = useSession();

  if (session) {
    if (session.user?.email) {
      invokeLoggedInAsToast(session.user.email);
    }

    return (
      <>
        <Toaster />
      </>
    );
  } else {
    return <></>;
  }
}

function invokeLoggedInAsToast(userEmail: string) {
  toast(
    <div className='flex items-center text-pretty space-x-2'>
      <GoogleIcon />
      <p className='text-secondary-foreground'>
        Logged in as <strong>{userEmail}</strong>
      </p>
    </div>,
    {
      style: {
        backgroundColor: 'hsl(220 14.3% 95.9%)',
      },
      duration: 3000,
      position: 'top-center',
    }
  );
}
