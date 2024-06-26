'use client';

import Scorecard from './scorecard/scorecard';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import RulesDrawer from './rules-drawer';
import useGameStore from '@/state';
import { InitialGameState } from '@/state/commands';

export default function Game() {
  const openScorecardAccordion = useGameStore(
    (state) => state.openScorecardAccordion
  );
  const currentGameState = useGameStore((state) => state.currentGameState);
  const updateUser = useGameStore((state) => state.updateUser);
  const handleShowRulesButtonClicked = useGameStore(
    (state) => state.handleShowRulesButtonClicked
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const checkOrientation = () => {
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  const { data: session } = useSession();

  useEffect(() => {
    updateUser(session);

    if (currentGameState instanceof InitialGameState) {
      setTimeout(openScorecardAccordion, 600);
    }

    // if (!session) {
    //   setTimeout(() => {
    //     invokeShowRulesToast(handleShowRulesButtonClicked);
    //   }, 1000);
    // }

    const handleResize = () => {
      checkOrientation();
    };

    checkOrientation();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', checkOrientation);
  }, [
    session,
    updateUser,
    handleShowRulesButtonClicked,
    currentGameState,
    openScorecardAccordion,
  ]);

  return (
    <>
      {!isLandscape ? (
        <div
          id={'game'}
          className='h-full flex flex-col-reverse w-full max-w-screen-sm overflow-auto'
        >
          <Scorecard />

          <RulesDrawer />
        </div>
      ) : (
        <OrientationWarning />
      )}
    </>
  );
}

function invokeShowRulesToast(clickHandler: () => void) {
  toast('Are you new here?', {
    style: { bottom: '85px' },
    description: 'Check the rules before playing!',
    duration: 8000,
    position: 'bottom-center',
    action: {
      label: 'Show Rules',
      onClick: clickHandler,
    },
    actionButtonStyle: {
      backgroundColor: 'white',
      color: 'hsl(220.9 39.3% 11%)',
      border: '1px solid hsl(220 13% 91%)',
      height: '2rem',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    },
  });
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
