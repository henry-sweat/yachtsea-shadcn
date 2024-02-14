import Header from './ui/header';
import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';

export default function Game() {
  return (
    <div className='h-[600px] flex flex-col flex-col-reverse py-4 space-y-4 space-y-reverse'>
      <RollButton />
      <DiceContainer />

      <Scorecard />
    </div>
  );
}
