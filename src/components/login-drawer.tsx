'use client';

import { useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { signIn } from 'next-auth/react';

export default function LoginDrawer() {
  const router = useRouter();
  return (
    <Drawer open={true} onClose={() => router.push('/')}>
      <DrawerContent>
        <div className='hide-scrollbar overflow-auto'>
          <DrawerHeader>
            <DrawerTitle>Sign In</DrawerTitle>
            <DrawerDescription>Use the provider below</DrawerDescription>
          </DrawerHeader>

          <article className='hide-scrollbar overflow-auto prose pt-2 pb-8 px-8'>
            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Google
            </h3>
            <a
              className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
              style={{ backgroundColor: '#ffffff', color: 'gray' }}
              onClick={() => signIn('google')}
              role='button'
            >
              Continue with Google
            </a>
          </article>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
