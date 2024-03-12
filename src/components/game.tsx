'use client';

import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useGameActions } from '@/stores/gameState';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Game() {
  const { updateUser } = useGameActions();
  const { data: session } = useSession();
  const [isLandscape, setIsLandscape] = useState(false);

  const checkOrientation = () => {
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  useEffect(() => {
    updateUser(session);

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, [session, updateUser]);

  return (
    <>
      {!isLandscape ? (
        <div
          id={'game'}
          className='flex flex-col-reverse space-y-2 space-y-reverse w-full max-w-screen-sm overflow-auto'
        >
          <RollButton />

          <Scorecard />
        </div>
      ) : (
        <OrientationWarning />
      )}
    </>
  );
}

function OrientationWarning() {
  return (
    <Card id='orientation-warning'>
      <CardHeader>
        <CardTitle>Hold up!</CardTitle>
        <CardDescription>
          This game is enjoyed best in portrait mode. Please adjust your screen.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
