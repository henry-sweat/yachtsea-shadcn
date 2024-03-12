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
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from './ui/toast';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function Game() {
  const { updateUser, updateRulesDrawerIsOpen } = useGameActions();
  const rulesDrawerIsOpen = useGameStateStore(
    (state) => state.rulesDrawerIsOpen
  );
  const { data: session } = useSession();
  const [isLandscape, setIsLandscape] = useState(false);

  const { toast } = useToast();

  const checkOrientation = () => {
    setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
  };

  useEffect(() => {
    updateUser(session);

    if (!session) {
      setTimeout(() => {
        toast({
          title: 'Are you new here?',
          description: 'Check out the rules before playing!',
          action: (
            <ToastAction altText='Show Rules' onClick={updateRulesDrawerIsOpen}>
              Show Rules
            </ToastAction>
          ),
        });
      }, 1000);
    }

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, [session, updateUser, toast, updateRulesDrawerIsOpen]);

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
                <DrawerDescription>
                  Roll the dice over 13 rounds for scoring combinations to get
                  the highest total score!
                </DrawerDescription>
              </DrawerHeader>
              <article className='prose py-2 px-8 '>
                <h3 className='text-lg font-semibold leading-none tracking-tight'>
                  Overview
                </h3>
                <p className='text-sm text-muted-foreground'>
                  You have 13 rounds to knock off as many of the 13 scoring
                  combinations as you can.
                </p>
                <p className='text-sm text-muted-foreground'>
                  Each round, roll the dice up to three times to achieve the
                  highest-scoring combination for one of the 13 categories. Once
                  rolling concludes, you must assign a score or a zero to one of
                  the 13 category boxes on your scorecard. The game concludes
                  when all participants have completed their scorecards with 13
                  entries. Final scores are then calculated, incorporating any
                  bonus points.
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
