import Link from 'next/link';
import UserButton from '../user-button';

export default function Header() {
  return (
    <header className='container relative mx-auto overflow-hidden py-4 px-4'>
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
