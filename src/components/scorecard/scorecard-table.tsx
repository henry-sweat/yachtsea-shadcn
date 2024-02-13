import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScoreRow, TotalRow } from './scorecard-rows';

export default function ScorecardTable() {
  return (
    <div className='flex justify-between'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Upper</TableHead>
            <TableHead className='text-right'>Pts.</TableHead>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Lower</TableHead>
            <TableHead className='text-right'>Pts.</TableHead>
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
