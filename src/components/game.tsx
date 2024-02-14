import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';

export default function Game() {
  return (
    <div className='space-y-4 space-y-reverse flex flex-col flex-col-reverse max-w-lg h-[565px]'>
      <RollButton />
      <DiceContainer />

      <Scorecard />
    </div>
  );
}
