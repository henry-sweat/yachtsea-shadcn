import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScoreRow, TotalRow } from './scorecard-rows';
import { useEffect, useRef } from 'react';

export default function ScorecardTable() {
  const upperScorecardRef = useRef<HTMLTableElement>(null);
  const lowerScorecardRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table1Container = upperScorecardRef.current;
    const table2Container = lowerScorecardRef.current;

    const syncScroll = (event: Event) => {
      const source = event.target as HTMLElement;
      if (source === table1Container && table2Container) {
        table2Container.scrollTop = source.scrollTop;
      } else if (source === table2Container && table1Container) {
        table1Container.scrollTop = source.scrollTop;
      }
    };

    // Add event listeners if both containers are present
    if (table1Container && table2Container) {
      table1Container.addEventListener('scroll', syncScroll);
      table2Container.addEventListener('scroll', syncScroll);
    }

    // Cleanup function to remove the event listeners
    return () => {
      if (table1Container && table2Container) {
        table1Container.removeEventListener('scroll', syncScroll);
        table2Container.removeEventListener('scroll', syncScroll);
      }
    };
  }, []);

  return (
    <div className='overflow-auto flex justify-between w-full'>
      <Table ref={upperScorecardRef}>
        <TableHeader>
          <TableRow className='text-[2vh] h-[4vh]'>
            <TableHead className='text-primary bg-white sticky top-0 w-[3/4]'>
              Upper
            </TableHead>
            <TableHead className='text-primary bg-white sticky top-0 text-right'>
              Pts.
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ScoreRow category={'Ones'} scorecardStateIndex={0} />
          <ScoreRow category={'Twos'} scorecardStateIndex={1} />
          <ScoreRow category={'Threes'} scorecardStateIndex={2} />
          <ScoreRow category={'Fours'} scorecardStateIndex={3} />
          <ScoreRow category={'Fives'} scorecardStateIndex={4} />
          <ScoreRow category={'Sixes'} scorecardStateIndex={5} />
          <TotalRow
            category={'Bonus'}
            totalsStateProperty={'upperSectionBonus'}
          />
          <TotalRow
            category={'Upper Total'}
            totalsStateProperty={'upperSectionTotal'}
          />
        </TableBody>
      </Table>
      <Table ref={lowerScorecardRef}>
        <TableHeader>
          <TableRow className='text-[2vh] h-[4vh]'>
            <TableHead className='text-primary bg-white sticky top-0 w-[3/4]'>
              Lower
            </TableHead>
            <TableHead className='text-primary bg-white sticky top-0 text-right'>
              Pts.
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ScoreRow category={'Set of 3'} scorecardStateIndex={6} />
          <ScoreRow category={'Set of 4'} scorecardStateIndex={7} />
          <ScoreRow category={'Full Haus'} scorecardStateIndex={8} />
          <ScoreRow category={'Sm. Str.'} scorecardStateIndex={9} />
          <ScoreRow category={'Lg. Str.'} scorecardStateIndex={10} />
          <ScoreRow
            category={'Yachtsea'}
            scorecardStateIndex={11}
            isYachtsea={true}
          />
          <ScoreRow category={'Chance'} scorecardStateIndex={12} />
          <TotalRow
            category={'Lower Total'}
            totalsStateProperty={'lowerSectionTotal'}
          />
        </TableBody>
      </Table>
    </div>
  );
}
