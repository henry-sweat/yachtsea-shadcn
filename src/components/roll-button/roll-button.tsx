'use client';

import useGameStateStore, { useGameActions } from '@/stores/gameState';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function RollButton() {
  const rollButtonText = useGameStateStore((state) => state.rollButtonText);
  const { updateGameStateForRollButtonClicked } = useGameActions();

  const rollDice = () => {
    updateGameStateForRollButtonClicked();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className=''
    >
      <Button
        className='w-full text-md'
        onClick={rollDice}
        size={'lg'}
        variant='default'
      >
        {rollButtonText}
      </Button>
    </motion.div>
  );
}
