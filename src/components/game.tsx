import Header from './ui/header';
import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Game() {
  return (
    <div className='flex flex-col flex-col-reverse space-y-4 space-y-reverse'>
      <RollButton />

      <DiceContainer />

      <Scorecard />
    </div>
  );
}
