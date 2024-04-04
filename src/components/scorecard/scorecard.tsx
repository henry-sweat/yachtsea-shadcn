'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { Separator } from '@/components/ui/separator';
import ScorecardTable from './scorecard-table';
import DiceContainer from '@/components/dice/dice-container';
import { InfoCircledIcon, PlusIcon, ResetIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import useGameStore from '@/state';
import UserButtonClientSide from '../user-buttons/user-button-client-side';

export default function Scorecard() {
  const scorecardAccordionIsOpen = useGameStore(
    (state) => state.scorecardAccordionIsOpen
  );

  const accordionValue = scorecardAccordionIsOpen ? 'scorecard' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className='h-full flex flex-col-reverse overflow-auto'
    >
      <Accordion
        className='h-full flex flex-col-reverse'
        type='single'
        value={accordionValue}
        collapsible
      >
        <AccordionItem
          className='h-full flex flex-col justify-between space-y-1'
          value='scorecard'
        >
          <AccordionContent className='pb-1'>
            <div className='rounded-md border px-6 py-2 font-mono text-sm shadow-sm'>
              <div className='flex flex-row justify-between items-center font-bold'>
                <RollCounter />
                <RoundCounter />
                <UserButtonClientSide />
              </div>
            </div>
          </AccordionContent>
          <AccordionContent className='overflow-hidden pb-0'>
            <div className='h-full flex flex-col justify-center items-center rounded-md border p-[1vh] font-mono text-sm shadow-sm'>
              <ScorecardTable />
              <Separator className='mb-2' />
              <GrandTotal />
            </div>
          </AccordionContent>
          <AccordionContent className='pb-2 px-0'>
            <DiceContainer />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function RollCounter() {
  const rollCounter = useGameStore((state) => state.rollCounter);
  return <h3 className='text-[2vh]'>Roll {rollCounter} /3</h3>;
}

function RoundCounter() {
  const roundCounter = useGameStore((state) => state.roundCounter);
  return <h3 className='text-[2vh]'>Round {roundCounter} /13</h3>;
}

function GrandTotal() {
  const totals = useGameStore((state) => state.totals);
  const handleInfoButtonClicked = useGameStore(
    (state) => state.handleInfoButtonClicked
  );
  const handleUndoButtonClicked = useGameStore(
    (state) => state.handleUndoButtonClicked
  );
  const handleRestartGameButtonClicked = useGameStore(
    (state) => state.handleRestartGameButtonClicked
  );

  return (
    <div className='text-[2vh] flex justify-around items-center w-full py-1'>
      <div className='flex space-x-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={handleRestartGameButtonClicked}
        >
          <PlusIcon className='w-[2vh] h-[2vh]' color='hsl(220 8.9% 46.1%)' />
        </Button>
        <Button variant='outline' size='icon' onClick={handleUndoButtonClicked}>
          <ResetIcon className='w-[2vh] h-[2vh]' color='hsl(220 8.9% 46.1%)' />
        </Button>
        <Button variant='outline' size='icon' onClick={handleInfoButtonClicked}>
          <InfoCircledIcon
            className='w-[2vh] h-[2vh]'
            color='hsl(220 8.9% 46.1%)'
          />
        </Button>
      </div>
      <p className='text-center text-muted-foreground pr-3'>
        Total score: <strong>{totals.grandTotal}</strong>
      </p>
    </div>
  );
}
