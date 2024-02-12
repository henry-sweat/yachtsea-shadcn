'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import ScorecardTable from './scorecard-table';
import useGameStateStore from '@/stores/gameState';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function Scorecard({ children }: IProps) {
  const scorecardAccordionIsOpen = useGameStateStore(
    (state) => state.scorecardAccordionIsOpen
  );

  const accordionValue = scorecardAccordionIsOpen ? 'scorecard' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Accordion className='' type='single' value={accordionValue} collapsible>
        <AccordionItem value='scorecard'>
          <div className='flex items-center py-2'>{children}</div>

          <AccordionContent>
            <div className='flex flex-col items-center justify-center rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
              <div className='flex justify-around space-x-12 font-bold pt-1'>
                <RollCounter />
                <RoundCounter />
              </div>
              <ScorecardTable />
              <GrandTotalCaption />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function RollCounter() {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  return <h3>Roll {rollCounter} /3</h3>;
}

function RoundCounter() {
  const roundCounter = useGameStateStore((state) => state.roundCounter);
  return <h3>Round {roundCounter} /13</h3>;
}

function GrandTotalCaption() {
  const totals = useGameStateStore((state) => state.totals);
  return (
    <p className='text-muted-foreground'>
      Your total score is <strong>{totals.grandTotal}</strong> points.
    </p>
  );
}