import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import UserButtonServerSide from './user-button-server-side';
import { Dot } from '@/components/dice/die';

export default async function Header() {
  const dotCoordinates = [
    { x: '12', y: '11' },
    { x: '12', y: '25' },
    { x: '12', y: '39' },
    { x: '38', y: '11' },
    { x: '38', y: '25' },
    { x: '38', y: '39' },
  ];

  return (
    <header className='mx-auto w-full'>
      <div className='flex items-center justify-between px-5 py-5'>
        <div className='flex space-x-2 items-center'>
          <Link href={'/home'}>
            <div className='flex space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 50 50'
                className='w-8 h-8 border-2 border-primary rounded-md shadow-md'
                fill='none'
              >
                {dotCoordinates.map((coord) => (
                  <Dot
                    key={`static-die-${coord.x}-${coord.y}`}
                    x={coord.x}
                    y={coord.y}
                  />
                ))}
              </svg>
            </div>
          </Link>
        </div>
        <UserButtonServerSide />
      </div>

      <Separator />
    </header>
  );
}
