'use client';

import { motion } from 'framer-motion';
import { shakeAnimation } from '@/lib/motion';
import useGameStateStore, { useGameActions } from '@/stores/gameState';
import Die from './die';
import { IDie } from '@/types';

const diceStateIndices = [0, 1, 2, 3, 4];

export default function DiceContainer() {
  const dice = useGameStateStore((state) => state.dice);
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const diceAreRolling = useGameStateStore((state) => state.diceAreRolling);
  const { updateDiceStateForDieClicked } = useGameActions();

  function handleDieClicked(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (rollCounter === 3 || rollCounter === 0) {
      return;
    }
    const clickedElement = e.target as Element;
    const die = clickedElement?.closest('.die-container');
    const indexOfClickedDie = Number(die?.id.slice(4)) - 1;
    updateDiceStateForDieClicked(indexOfClickedDie);
  }

  return (
    <div className='grid grid-cols-5 gap-2 w-full max-w-[600px]'>
      {diceStateIndices.map((diceStateIndex) => (
        <motion.button
          id={dice[diceStateIndex].id}
          className={`die-container ${
            dice[diceStateIndex].isSelected ? `die-selected` : ''
          } aspect-square w-full rounded-md bg-primary-foreground border border-input transition-colors shadow-sm`}
          value={diceStateIndex.toString()}
          key={`key-${diceStateIndex}`}
          onClick={handleDieClicked}
          initial={rollCounter > 0 ? false : { opacity: 0, y: 50 }}
          animate={
            diceAreRolling && !dice[diceStateIndex].isSelected
              ? `shake${diceStateIndex + 1}`
              : 'default'
          }
          variants={shakeAnimation}
          whileHover={{
            scale: 1.08,
            rotate: 5 * (0.5 - Math.random()),
            zIndex: 60,
            transition: {
              type: 'spring',
              stiffness: 1000,
              damping: 26,
              mass: 3,
            },
          }}
          whileTap={{
            scale: 0.95,
            transition: {
              type: 'spring',
              stiffness: 900,
              damping: 40,
              mass: 3,
            },
          }}
        >
          <Die diceStateIndex={diceStateIndex} />
        </motion.button>
      ))}
    </div>
  );
}

function returnIndexesOfSelectedDice(diceState: IDie[]): string[] {
  return diceState
    .map((die, idx) => (die.isSelected ? idx.toString() : ''))
    .filter((die) => die.length > 0);
}
