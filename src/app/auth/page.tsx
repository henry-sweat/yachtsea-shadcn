'use client';

import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push('/');
      }}
    >
      click to go home
    </button>
  );
}
