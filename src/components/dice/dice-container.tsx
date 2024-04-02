'use client';

import { motion } from 'framer-motion';
import { shakeAnimation } from '@/lib/motion';
import useGameStore from '@/state';
import Die from './die';
import { Switch } from '../ui/switch';
import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useState } from 'react';

const diceStateIndices = [0, 1, 2, 3, 4];

export default function DiceContainer() {
  const dice = useGameStore((state) => state.dice);
  const diceAreRolling = useGameStore((state) => state.diceAreRolling);
  const handleDieClicked = useGameStore((state) => state.handleDieClicked);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (diceAreRolling) {
      return;
    }
    const clickedElement = e.target as Element;
    const die = clickedElement?.closest('.die-container');
    const indexOfClickedDie = Number(die?.id.slice(4)) - 1;
    handleDieClicked(indexOfClickedDie);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='grid grid-cols-5 gap-2 w-full overflow-hidden px-3 pt-2'>
      {diceStateIndices.map((diceStateIndex) => (
        <Switch
          checked={dice[diceStateIndex].isSelected}
          className={`z-0`}
          key={`key-${diceStateIndex}`}
        >
          <motion.button
            id={dice[diceStateIndex].id}
            className={`die-container ${
              dice[diceStateIndex].isSelected ? `bg-input border-secondary` : ''
            } aspect-square z-20 w-full rounded-md bg-secondary border border-gray-300 transition-colors shadow-sm`}
            value={'1'}
            onClick={clickHandler}
            initial={{ y: 0 }}
            animate={
              dice[diceStateIndex].isSelected
                ? {
                    y: `calc(${((screenWidth - 56) / 5) * (3 / 7) - 2}px)`,
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }
                : diceAreRolling
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

          <LockClosedIcon className='absolute h-5 w-5 text-white pointer-events-none top-1' />
          <LockOpen1Icon className='absolute h-5 w-5 text-primary pointer-events-none bottom-1' />
        </Switch>
      ))}
    </div>
  );
}
