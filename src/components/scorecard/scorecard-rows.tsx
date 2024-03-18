import { ITotals } from '@/types';
import { TableRow, TableCell } from '@/components/ui/table';
import useGameStore from '@/state';

interface IScoreRowProps {
  category: string;
  scorecardStateIndex: number;
  isYachtsea?: boolean;
}

export function ScoreRow({
  category,
  scorecardStateIndex,
  isYachtsea = false,
}: IScoreRowProps) {
  const scorecard = useGameStore((state) => state.scorecard);
  const handleScorecardRowClicked = useGameStore(
    (state) => state.handleScorecardRowClicked
  );

  function clickHandler(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
    const clickedElement = e.target as Element;
    const scoreRow = clickedElement?.closest('.score-row');
    const indexOfClickedRow = Number(scoreRow?.id.slice(10));
    handleScorecardRowClicked(indexOfClickedRow);
  }

  const earnedPoints = scorecard.rows[scorecardStateIndex]?.earnedPoints ?? -1;

  return earnedPoints >= 0 ? (
    isYachtsea ? (
      <TableRow
        id={`score-row-${11}`}
        className={`score-row bg-muted/70`}
        key={`scorecard-row-key-${11}`}
      >
        <TableCell className='py-2 pl-2 font-medium font-bold'>
          {'Yachtsea'}
        </TableCell>
        <TableCell className='p-2 text-right font-bold'>
          {earnedPoints + scorecard.yachtseaBonus.numberOfBonuses * 100}
        </TableCell>
      </TableRow>
    ) : (
      <TableRow
        id={`score-row-${scorecardStateIndex}`}
        className={`score-row bg-muted/70`}
        key={`scorecard-row-key-${scorecardStateIndex}`}
      >
        <TableCell className='py-2 pl-2 font-medium font-bold'>
          {category}
        </TableCell>
        <TableCell className='p-2 text-right font-bold'>
          {scorecard.rows[scorecardStateIndex].earnedPoints}
        </TableCell>
      </TableRow>
    )
  ) : (
    <TableRow
      id={`score-row-${scorecardStateIndex}`}
      className={`score-row ${
        scorecard.yachtseaBonus.yachtseaBonusOptions[scorecardStateIndex]
          ? 'bg-pulse'
          : ''
      }`}
      onClick={clickHandler}
      key={`scorecard-row-key-${scorecardStateIndex}`}
    >
      <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
        {category}
      </TableCell>
      <TableCell className='p-2 text-right text-muted-foreground'>
        {scorecard.rows[scorecardStateIndex].potentialPoints}
      </TableCell>
    </TableRow>
  );
}

interface ITotalRowProps {
  category: string;
  totalsStateProperty: keyof ITotals;
}

export function TotalRow({ category, totalsStateProperty }: ITotalRowProps) {
  return (
    <TableRow
      id={`total-row-${totalsStateProperty}`}
      className={`total-row ${
        category !== 'Bonus' ? 'sticky bottom-0 bg-white' : ''
      }`}
      key={`total-row-key-${totalsStateProperty}`}
    >
      <TableCell
        className={`py-2 pl-2 font-medium font-bold ${
          category === 'Bonus' ? 'italic' : ''
        }`}
      >
        {category}
      </TableCell>
      <TotalCell totalsStateProperty={totalsStateProperty} />
    </TableRow>
  );
}

interface ITotalCellProps {
  totalsStateProperty: keyof ITotals;
}

function TotalCell({ totalsStateProperty }: ITotalCellProps) {
  const totals = useGameStore((state) => state.totals);

  return (
    <TableCell className='p-2 text-right font-bold'>
      {totals[totalsStateProperty]}
    </TableCell>
  );
}
