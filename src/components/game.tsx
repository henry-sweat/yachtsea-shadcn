'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import Die from './dice/dice';
import { useState } from 'react';

export default function Game() {
  const [diceValue, setDiceValue] = useState<number[]>([1, 2, 3, 4, 5]);

  const rollDice = () => {
    const rolls = 10; // Number of times to change the value before stopping
    let count = 0;

    const intervalId = setInterval(() => {
      // Generate a new array of random values for each die
      const newValues = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setDiceValue(newValues);

      count += 1;

      if (count >= rolls) {
        clearInterval(intervalId);
        // Set the final values for each die
        const finalValues = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 6) + 1
        );
        setDiceValue(finalValues);
      }
    }, 100); // Change value every 100ms
  };

  return (
    <div className='flex-col space-y-4'>
      <Button onClick={rollDice} variant='default'>
        Roll
      </Button>
      <ToggleGroup className='space-x-2' type='multiple' variant='outline'>
        <ToggleGroupItem
          className='w-16 h-16 px-0'
          value='1'
          aria-label='Toggle 1'
        >
          <Die value={diceValue[0]} />
        </ToggleGroupItem>
        <ToggleGroupItem
          className='w-16 h-16 px-0'
          value='2'
          aria-label='Toggle 2'
        >
          <Die value={diceValue[1]} />
        </ToggleGroupItem>
        <ToggleGroupItem
          className='w-16 h-16 px-0'
          value='3'
          aria-label='Toggle 3'
        >
          <Die value={diceValue[2]} />
        </ToggleGroupItem>
        <ToggleGroupItem
          className='w-16 h-16 px-0'
          value='4'
          aria-label='Toggle 4'
        >
          <Die value={diceValue[3]} />
        </ToggleGroupItem>
        <ToggleGroupItem
          className='w-16 h-16 px-0'
          value='5'
          aria-label='Toggle 5'
        >
          <Die value={diceValue[4]} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
