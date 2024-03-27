'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import ScorecardTable from './scorecard-table';
import DiceContainer from '@/components/dice/dice-container';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import useGameStore from '@/state';
import UserButtonClientSide from '../user-button-client-side';

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
      className='h-full flex flex-col-reverse overflow-auto pb-2'
    >
      <Accordion
        className='h-full flex flex-col-reverse'
        type='single'
        value={accordionValue}
        collapsible
      >
        <AccordionItem className='h-full flex flex-col' value='scorecard'>
          <AccordionContent>
            <div className='rounded-md border px-6 py-2 font-mono text-sm shadow-sm'>
              <div className='flex flex-row justify-between items-center font-bold'>
                <RollCounter />
                <RoundCounter />
                <UserButtonClientSide />
              </div>
            </div>
          </AccordionContent>
          <AccordionContent className='h-full overflow-hidden pb-0'>
            <div className='h-full flex flex-col items-center rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
              <ScorecardTable />

              <Separator className='mb-2' />
              <GrandTotal />
            </div>
          </AccordionContent>
          <AccordionContent className='pb-0 px-0'>
            <DiceContainer />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function RollCounter() {
  const rollCounter = useGameStore((state) => state.rollCounter);
  return <h3>Roll {rollCounter} /3</h3>;
}

function RoundCounter() {
  const roundCounter = useGameStore((state) => state.roundCounter);
  return <h3>Round {roundCounter} /13</h3>;
}

function GrandTotal() {
  const totals = useGameStore((state) => state.totals);
  const handleInfoIconClicked = useGameStore(
    (state) => state.handleInfoIconClicked
  );

  const clickHandler = () => {
    handleInfoIconClicked();
  };

  return (
    <div className='flex justify-center items-center w-full py-1'>
      <p className='text-center text-muted-foreground'>
        Your total score is <strong>{totals.grandTotal}</strong> points.{' '}
      </p>
      <div className='pl-1'>
        <InfoCircledIcon color='hsl(220 8.9% 46.1%)' onClick={clickHandler} />
      </div>
    </div>
  );
}
