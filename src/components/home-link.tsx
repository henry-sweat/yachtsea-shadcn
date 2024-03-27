'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuItem } from './ui/dropdown-menu';

export default function HomeLink() {
  const pathname = usePathname();

  if (pathname === '/home') {
    return undefined;
  } else {
    return (
      <Link href={'/home'}>
        <DropdownMenuItem>Home</DropdownMenuItem>
      </Link>
    );
  }
}
