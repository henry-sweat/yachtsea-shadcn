'use client';

import { Button } from '../ui/button';
import useGameStore from '@/state';

export default function RollButton() {
  const { handleRollButtonClicked, rollButtonText, rollButtonPulse } =
    useGameStore((state) => ({
      handleRollButtonClicked: state.handleRollButtonClicked,
      rollButtonText: state.rollButtonText,
      rollButtonPulse: state.rollButtonPulse,
    }));

  return (
    <Button
      className={`w-full ${rollButtonPulse ? 'animate-pulse' : ''}`}
      onClick={handleRollButtonClicked}
      size={'roll'}
      variant='default'
    >
      {rollButtonText}
    </Button>
  );
}
