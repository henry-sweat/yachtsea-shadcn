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
    console.log('session:', session);
    updateUser(session);
  }, [session, updateUser]);

  return (
    <>
      <RollButton />

      <DiceContainer />

      <Scorecard />
    </>
  );
}
