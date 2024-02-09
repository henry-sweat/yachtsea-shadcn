import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion, Variants } from 'framer-motion';
import Die from './die';

const diceIndexes = [1, 2, 3, 4, 5];

const shift = 6;
// Animation variants for shaking
const shakeAnimation: Variants = {
  shake1: {
    x: [0, -shift, shift, shift, 0, -shift, shift, -shift, 0, 0],
    y: [0, 0, 0, -shift, shift, -shift, 0, shift, 0, -shift],
    transition: {
      repeat: Infinity, // Indicate the animation should repeat indefinitely
      duration: 0.5, // Duration of one cycle of the animation
      repeatType: 'loop', // Ensures the animation loops
    },
  },
  shake2: {
    x: [0, 0, -shift, shift, 0, 0, -shift, 0, 0, 0],
    y: [0, shift, 0, 0, -shift, shift, 0, shift, -shift, 0],
    transition: {
      repeat: Infinity, // Indicate the animation should repeat indefinitely
      duration: 0.5, // Duration of one cycle of the animation
      repeatType: 'loop', // Ensures the animation loops
    },
  },
  shake3: {
    x: [0, shift, 0, shift, -shift, 0, -shift, shift, 0, -shift],
    y: [0, -shift, shift, 0, 0, -shift, shift, 0, shift, 0],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'loop',
    },
  },
  shake4: {
    x: [0, shift, 0, 0, -shift, shift, 0, shift, -shift, 0],
    y: [0, 0, -shift, shift, 0, 0, -shift, 0, 0, 0],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'loop',
    },
  },
  shake5: {
    x: [0, -shift, 0, -shift, shift, shift, 0, shift, 0, 0],
    y: [0, 0, shift, -shift, 0, -shift, shift, 0, shift, -shift],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'loop',
    },
  },
};

interface IProps {
  diceValue: number[];
  isRolling: boolean;
}

export default function DiceContainer({ diceValue, isRolling }: IProps) {
  return (
    <ToggleGroup className='space-x-2' type='multiple' variant='outline'>
      {diceIndexes.map((idx) => (
        <motion.div
          key={`key-${idx}`}
          animate={isRolling ? `shake${diceIndexes[idx - 1]}` : ''}
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
          <ToggleGroupItem
            className='w-16 h-16 px-0 bg-primary-foreground'
            value={idx.toString()}
            aria-label={`Toggle ${idx}`}
          >
            <Die value={diceValue[idx - 1]} />
          </ToggleGroupItem>
        </motion.div>
      ))}
    </ToggleGroup>
  );
}
