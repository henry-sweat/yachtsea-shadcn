'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/home');
    const loadingScreen = document.getElementById('loading-screen');

    const fadeoutLoadingScreenTimer = setTimeout(() => {
      loadingScreen?.classList.add('fade-out');
    }, 250);

    const rerouteToHomeTimer = setTimeout(() => {
      router.push('/home');
    }, 1250);

    return () => {
      clearTimeout(fadeoutLoadingScreenTimer);
      clearTimeout(rerouteToHomeTimer);
    };
  }, [router]);

  return undefined;
}
