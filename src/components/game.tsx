'use client';

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
import { toast } from 'sonner';
import RulesDrawer from './rules-drawer';

export default function Game() {
  const { updateUser, updateRulesDrawerIsOpen } = useGameActions();
  const { data: session } = useSession();
  const [isLandscape, setIsLandscape] = useState(false);

  const checkOrientation = () => {
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  useEffect(() => {
    updateUser(session);

    if (!session) {
      setTimeout(() => {
        toast('Are you new here?', {
          description: 'Check out the rules before playing!',
          duration: 8000,
          position: 'bottom-right',
          action: {
            label: 'Show Rules',
            onClick: updateRulesDrawerIsOpen,
          },
          actionButtonStyle: {
            backgroundColor: 'Background',
            color: 'hsl(220.9 39.3% 11%)',
            border: '1px solid hsl(220 13% 91%)',
            height: '2rem',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          },
        });
      }, 1000);
    }

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, [session, updateUser, updateRulesDrawerIsOpen]);

  return (
    <>
      {!isLandscape ? (
        <div
          id={'game'}
          className='flex flex-col-reverse space-y-2 space-y-reverse w-full max-w-screen-sm overflow-auto'
        >
          <RollButton />

          <Scorecard />

          <RulesDrawer />
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
