import Link from 'next/link';
import UserButton from '../user-button';

export default function Header() {
  return (
    <header className='fixed inset-x-0 bottom-0 mx-auto overflow-hidden pb-4 pl-4 pr-4'>
      <div className='flex justify-between mx-auto w-full max-w-2xl bg-white'>
        <nav className='flex space-x-4'>
          <Link
            href={'/'}
            className={`max-w-md text-pretty text-lg text-muted-foreground hover:underline`}
          >
            home
          </Link>
        </nav>
        <UserButton />
      </div>
    </header>
  );
}
