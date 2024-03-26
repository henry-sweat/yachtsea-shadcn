import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import UserButtonServerSide from './user-button-server-side';

export default async function Header() {
  return (
    <header className='mx-auto w-full'>
      <div className='flex items-center justify-between px-5 py-2'>
        <div className='flex space-x-2 items-center'>
          <Link href={'/'}>
            <h1 className='text-xl font-semibold'>Yachtsea</h1>
          </Link>
        </div>
        <UserButtonServerSide />
      </div>

      <Separator />
    </header>
  );
}
