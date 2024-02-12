import DiceContainer from './dice/dice-container';
import Scorecard from './scorecard/scorecard';
import RollButton from './roll-button/roll-button';

export default function Game() {
  return (
    <div className='flex flex-col max-w-lg'>
      <DiceContainer />

      <Scorecard>
        <RollButton />
      </Scorecard>
    </div>
  );
}
