'use client';

import { useGameActions } from '@/stores/gameState';
import { Button } from '../ui/button';

export default function RollButton() {
  const { updateGameStateForRollButtonClicked } = useGameActions();

  const rollDice = () => {
    updateGameStateForRollButtonClicked();
  };

  return (
    <Button
      className='w-auto text-md'
      onClick={rollDice}
      size={'lg'}
      variant='default'
    >
      Roll
    </Button>
  );
}
