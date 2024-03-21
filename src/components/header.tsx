import Link from 'next/link';
import UserButton from './user-button';

export default function Header() {
  return (
    <header className='flex flex-row-reverse items-center justify-between absolute mx-auto p-6 w-full'>
      <UserButton />
    </header>
  );
}
