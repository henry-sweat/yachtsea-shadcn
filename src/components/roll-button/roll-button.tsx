'use client';

import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import useGameStore from '@/state';

export default function RollButton() {
  const handleRollButtonClicked = useGameStore(
    (state) => state.handleRollButtonClicked
  );
  const rollButtonText = useGameStore((state) => state.rollButtonText);
  const rollButtonPulse = useGameStore((state) => state.rollButtonPulse);

  const clickHandler = () => {
    handleRollButtonClicked();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className='w-full px-3'
    >
      <Button
        className={`w-full ${rollButtonPulse ? 'new-game-pulse' : ''}`}
        onClick={clickHandler}
        size={'roll'}
        variant='default'
      >
        {rollButtonText}
      </Button>
    </motion.div>
  );
}
