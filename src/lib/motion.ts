import { Variants } from 'framer-motion';

const shift = 6;

export const shakeAnimation: Variants = {
  shake1: {
    x: [0, -shift, shift, shift, 0, -shift, shift, -shift, 0, 0],
    y: [0, 0, 0, -shift, shift, -shift, 0, shift, 0, -shift],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'loop',
    },
  },
  shake2: {
    x: [0, 0, -shift, shift, 0, 0, -shift, 0, 0, 0],
    y: [0, shift, 0, 0, -shift, shift, 0, shift, -shift, 0],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      repeatType: 'loop',
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
  default: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.15 },
  },
  isSelected: {
    y: '-4vh',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};
