'use client';

import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useGameStateStore, { useGameActions } from '@/stores/gameState';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import DiceContainer from './dice/dice-container';

export default function Game() {
  const { updateUser, updateRulesDrawerIsOpen } = useGameActions();
  const rulesDrawerIsOpen = useGameStateStore(
    (state) => state.rulesDrawerIsOpen
  );
  const { data: session } = useSession();
  const [isLandscape, setIsLandscape] = useState(false);

  const checkOrientation = () => {
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  useEffect(() => {
    updateUser(session);

    // if (!session) {
    //   setTimeout(() => {
    //     toast('Are you new here?', {
    //       description: 'Check out the rules before playing!',
    //       duration: 800000,
    //       position: 'bottom-right',
    //       action: {
    //         label: 'Show Rules',
    //         onClick: updateRulesDrawerIsOpen,
    //       },
    //       actionButtonStyle: {
    //         backgroundColor: 'Background',
    //         color: 'hsl(220.9 39.3% 11%)',
    //         border: '1px solid hsl(220 13% 91%)',
    //         height: '2rem',
    //         boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    //       },
    //     });
    //   }, 1000);
    // }

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

          <Drawer open={rulesDrawerIsOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Rules of Yachtsea</DrawerTitle>
                <DrawerDescription>Ye Olde Dice Game</DrawerDescription>
              </DrawerHeader>
              <article className='hide-scrollbar overflow-auto prose py-2 px-8'>
                <h3 className='text-lg font-semibold leading-none tracking-tight'>
                  Overview
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Players have 13 rounds to knock off as many of the 13 scoring
                  combinations as they can.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Each round, roll the dice up to three times to achieve the
                  highest-scoring combination for one of the 13 categories. Once
                  rolling concludes, you must assign a score or a zero to one of
                  the 13 category boxes on your scorecard.
                </p>
                <p className='text-sm text-muted-foreground'>
                  The game concludes when players have completed their
                  scorecards with 13 entries. Final scores are then calculated,
                  incorporating any bonus points.
                </p>
                <h3 className='text-lg font-semibold leading-none tracking-tight'>
                  Rolling The Dice
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Each round, a player may roll the dice up to 3 times. On the
                  first roll, all 5 dice are thrown. Then, a player selects any
                  dice they want to `keep` by tapping the respective die.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Reroll ANY or ALL dice- even `keepers` from the previous roll.
                  Players don`t need to declare which combination they`re
                  rolling for; they may change their mind after any roll.
                </p>
              </article>
            </DrawerContent>
          </Drawer>
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
