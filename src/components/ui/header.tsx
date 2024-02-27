import Link from 'next/link';
import UserButton from '../user-button';

export default function Header() {
  return (
    <header className='container relative mx-auto p-6 sm:pt-12'>
      <div className='flex items-center justify-between mx-auto w-full max-w-lg bg-white'>
        <nav className='flex space-x-4'>
          <Link href={'/'} className={`hover:underline`}>
            <h1 className='text-lg font-mono text-primary'>Yachtsea</h1>
          </Link>
        </nav>

        <UserButton />
      </div>
    </header>
  );
}
