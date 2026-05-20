'use client';

import { motion } from 'framer-motion';
import { DotContainer, Dot } from '@/components/dice/die';

const diceValues = [5, 3, 6, 2, 4]; // Shows a variety of dice

const dotCoordinates: Map<number, { x: string; y: string }[]> = new Map([
  [1, [{ x: '25', y: '25' }]],
  [
    2,
    [
      { x: '12', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    3,
    [
      { x: '12', y: '12' },
      { x: '25', y: '25' },
      { x: '38', y: '38' },
    ],
  ],
  [
    4,
    [
      { x: '12', y: '12' },
      { x: '12', y: '38' },
      { x: '38', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    5,
    [
      { x: '12', y: '12' },
      { x: '12', y: '38' },
      { x: '25', y: '25' },
      { x: '38', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    6,
    [
      { x: '12', y: '12' },
      { x: '12', y: '25' },
      { x: '12', y: '38' },
      { x: '38', y: '12' },
      { x: '38', y: '25' },
      { x: '38', y: '38' },
    ],
  ],
]);

// Subtle shake animations for each die
const shakeVariants: { [key: string]: any } = {
  shake1: {
    rotate: [0, -2, 2, -2, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
    },
  },
  shake2: {
    rotate: [0, 2, -2, 2, 0],
    transition: {
      repeat: Infinity,
      duration: 3.5,
      ease: 'easeInOut',
      delay: 0.2,
    },
  },
  shake3: {
    rotate: [0, -1, 1, -1, 0],
    transition: {
      repeat: Infinity,
      duration: 2.8,
      ease: 'easeInOut',
      delay: 0.4,
    },
  },
  shake4: {
    rotate: [0, 1.5, -1.5, 1.5, 0],
    transition: {
      repeat: Infinity,
      duration: 3.2,
      ease: 'easeInOut',
      delay: 0.6,
    },
  },
  shake5: {
    rotate: [0, -1.5, 1.5, -1.5, 0],
    transition: {
      repeat: Infinity,
      duration: 3.4,
      ease: 'easeInOut',
      delay: 0.8,
    },
  },
};

export default function HeroDiceAnimation() {
  return (
    <div className='flex items-center justify-center gap-2 py-8'>
      {diceValues.map((value, index) => (
        <motion.div
          key={index}
          variants={shakeVariants}
          animate={`shake${index + 1}`}
          className='w-14 h-14 sm:w-16 sm:h-16 bg-background border-2 border-primary rounded-lg shadow-lg'
        >
          <DotContainer>
            {(dotCoordinates.get(value) || []).map((dot) => (
              <Dot x={dot.x} y={dot.y} key={`${index}-${dot.x}-${dot.y}`} />
            ))}
          </DotContainer>
        </motion.div>
      ))}
    </div>
  );
}
