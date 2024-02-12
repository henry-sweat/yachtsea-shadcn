'use client';

import { useGameActions } from '@/stores/gameState';
import { Button } from '../ui/button';

export default function RollButton() {
  const { updateGameStateForRollButtonClicked } = useGameActions();

  const rollDice = () => {
    updateGameStateForRollButtonClicked();
  };

  return (
    <Button className='w-auto flex-1 my-2' onClick={rollDice} variant='default'>
      Roll
    </Button>
  );
}
