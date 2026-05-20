'use client';

import { useEffect, useState } from 'react';

/**
 * Social Proof Component
 *
 * Displays engaging statistics to create FOMO and social validation.
 * Currently uses placeholder data - can be connected to real-time stats later.
 */
export default function SocialProof() {
  const [gamesPlayed, setGamesPlayed] = useState(3234567);

  // Optional: Simulate live counter incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setGamesPlayed((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-center space-y-2'>
      <p className='text-lg text-muted-foreground font-medium'>
        {gamesPlayed.toLocaleString()}+ games played
      </p>
    </div>
  );
}
