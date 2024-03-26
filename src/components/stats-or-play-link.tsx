'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenuItem } from './ui/dropdown-menu';

export default function StatsOrPlayLink() {
  const pathname = usePathname();

  if (pathname === '/play') {
    return (
      <Link href={'/stats'}>
        <DropdownMenuItem>Stats</DropdownMenuItem>
      </Link>
    );
  } else {
    return (
      <Link href={'/play'}>
        <DropdownMenuItem>Play</DropdownMenuItem>
      </Link>
    );
  }
}
