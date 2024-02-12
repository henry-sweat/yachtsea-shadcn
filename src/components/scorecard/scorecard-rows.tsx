import { TableRow, TableCell } from '../ui/table';
import useGameStateStore, { useGameActions } from '@/stores/gameState';

interface IScoreRowProps {
  category: string;
  scorecardStateIndex: number;
}

export function ScoreRow({ category, scorecardStateIndex }: IScoreRowProps) {
  const rollCounter = useGameStateStore((state) => state.rollCounter);
  const scorecard = useGameStateStore((state) => state.scorecard);
  const userHasSelectedPoints = useGameStateStore(
    (state) => state.userHasSelectedPoints
  );
  const { updateGameStateForPointsClicked } = useGameActions();

  function handlePointsClicked(e) {
    if (rollCounter === 0 || userHasSelectedPoints) {
      return;
    }
    const clickedElement = e.target as Element;
    const scoreRow = clickedElement?.closest('.score-row');
    const indexOfClickedRow = Number(scoreRow?.id.slice(10));
    updateGameStateForPointsClicked(indexOfClickedRow);
  }

  return scorecard.rows[scorecardStateIndex].earnedPoints >= 0 ? (
    <TableRow
      id={`score-row-${scorecardStateIndex}`}
      className='score-row'
      key={`scorecard-row-key-${scorecardStateIndex}`}
    >
      <TableCell className='font-medium'>{category}</TableCell>
      <TableCell className='text-right font-bold'>
        {scorecard.rows[scorecardStateIndex].earnedPoints}
      </TableCell>
    </TableRow>
  ) : (
    <TableRow
      id={`score-row-${scorecardStateIndex}`}
      className='score-row'
      onClick={handlePointsClicked}
      key={`scorecard-row-key-${scorecardStateIndex}`}
    >
      <TableCell className='font-medium'>{category}</TableCell>
      <TableCell className='text-right text-muted-foreground'>
        {scorecard.rows[scorecardStateIndex].potentialPoints}
      </TableCell>
    </TableRow>
  );
}

interface ITotalRowProps {
  category: string;
  totalsStateProperty: string;
}

export function TotalRow({ category, totalsStateProperty }: ITotalRowProps) {
  return (
    <TableRow
      id={`total-row-${totalsStateProperty}`}
      className='total-row'
      key={`total-row-key-${totalsStateProperty}`}
    >
      <TableCell className='font-medium font-bold'>{category}</TableCell>
      <TotalCell totalsStateProperty={totalsStateProperty} />
    </TableRow>
  );
}

interface ITotalCellProps {
  totalsStateProperty: string;
}

function TotalCell({ totalsStateProperty }: ITotalCellProps) {
  const totals = useGameStateStore((state) => state.totals);

  return totalsStateProperty === 'upperSectionSubTotal' ? (
    <TableCell className='text-right font-bold'>
      {`${totals[totalsStateProperty]} / 63`}
    </TableCell>
  ) : (
    <TableCell className='text-right font-bold'>
      {totals[totalsStateProperty]}
    </TableCell>
  );
}
