'use client';

import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useGameActions } from '@/stores/gameState';

export default function Game() {
  const { updateUser } = useGameActions();
  const { data: session } = useSession();

  useEffect(() => {
    updateUser(session);
  }, [session, updateUser]);

  return (
    <div className='flex flex-col-reverse space-y-2 space-y-reverse max-w-screen-sm overflow-auto px-3'>
      <RollButton />

      <DiceContainer />

      <Scorecard />
    </div>
  );
}
