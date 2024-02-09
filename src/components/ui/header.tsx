import Link from 'next/link';

export default function Header() {
  return (
    <header className='container relative mx-auto overflow-hidden pb-4 pl-4 pr-4 pt-6 md:pb-4 md:pl-16 md:pr-16 md:pt-16'>
      <div className='mx-auto w-full max-w-2xl bg-white'>
        <nav className='flex flex space-x-4'>
          <Link
            href={'/'}
            className={`max-w-md text-pretty text-lg text-muted-foreground hover:underline`}
          >
            home
          </Link>
        </nav>
      </div>
    </header>
  );
}
