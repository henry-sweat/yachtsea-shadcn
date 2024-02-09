'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard.tsx/scorecard';

export default function Game() {
  const [diceValue, setDiceValue] = useState<number[]>([1, 2, 3, 4, 5]);
  const [isRolling, setIsRolling] = useState(false);
  const [notifications, setNotifications] = useState<number[]>([]);

  const removeNotification = () => {
    setNotifications([]);
  };

  const rollDice = () => {
    if (notifications.length) {
      setNotifications([]);
    }
    setIsRolling(true); // Start the shake animation
    const rolls = 10;
    let count = 0;

    const intervalId = setInterval(() => {
      const newValues = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValue(newValues);

      count += 1;

      if (count >= rolls) {
        clearInterval(intervalId);
        setIsRolling(false); // Stop the shake animation
        setNotifications([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      }
    }, 100);
  };

  return (
    <div className='flex flex-col max-w-lg space-y-4'>
      <DiceContainer diceValue={diceValue} isRolling={isRolling} />

      <Button className='w-auto' onClick={rollDice} variant='default'>
        Roll
      </Button>

      <Scorecard />

      {/* <ul className='flex flex-col space-y-1' style={{ padding: 0 }}>
        <AnimatePresence>
          {notifications.map((id) => (
            <motion.li
              className=''
              key={id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '2.5rem' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              whileTap={{
                scale: 0.95,
                transition: {
                  type: 'spring',
                  stiffness: 900,
                  damping: 40,
                  mass: 3,
                },
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Card
                id='scorecardPreview'
                className='flex items-center justify-center w-full'
                onClick={() => removeNotification()}
              >
                <CardContent className='py-2 px-4 flex justify-between items-center w-full'>
                  <CardTitle className='text-primary font-bold'>
                    Full Haus
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul> */}
    </div>
  );
}
