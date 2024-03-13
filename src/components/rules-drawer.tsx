'use client';

import useGameStateStore from '@/stores/gameState';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';

export default function RulesDrawer() {
  const rulesDrawerIsOpen = useGameStateStore(
    (state) => state.rulesDrawerIsOpen
  );

  return (
    <Drawer open={rulesDrawerIsOpen}>
      <DrawerContent>
        <div className='hide-scrollbar overflow-auto'>
          <DrawerHeader>
            <DrawerTitle>Rules of Yachtsea</DrawerTitle>
            <DrawerDescription>Ye Olde Dice Game</DrawerDescription>
          </DrawerHeader>

          <article className='hide-scrollbar overflow-auto prose pt-2 pb-8 px-8'>
            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Overview
            </h3>
            <p className='text-sm text-muted-foreground'>
              13 rounds. 3 rolls per round.
            </p>
            <p className='text-sm text-muted-foreground'>
              Select dice to keep in between rolls by tapping the respective
              die.
            </p>
            <p className='text-sm text-muted-foreground'>
              Roll the dice up to 3 times, then make a selection on the
              scorecard by tapping the appropriate row to lock in points.
            </p>
            <p className='text-sm text-muted-foreground'>
              Repeat until 13 rounds are up. Then, share your score with
              friends!
            </p>

            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Rolling The Dice
            </h3>
            <p className='text-sm text-muted-foreground'>
              Each round, a player may roll the dice up to 3 times. On the first
              roll, all 5 dice are thrown. Then, a player selects any dice they
              want to `keep` by tapping the respective die.
            </p>
            <p className='text-sm text-muted-foreground'>
              Reroll ANY or ALL dice- even `keepers` from the previous roll.
              Players {"don't"} need to declare which combination {"they're"}
              rolling for; they may change their mind after any roll.
            </p>
            <p className='text-sm text-muted-foreground'>
              A player may roll the dice up to 3 times, although they may stop
              and score after the first or second roll if they choose.
            </p>

            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Scoring
            </h3>
            <p className='text-sm text-muted-foreground'>
              When a player is finished rolling, they must decide which box to
              mark on their score card. A player marks their score by tapping on
              the respective box.
            </p>
            <p className='text-sm text-muted-foreground'>
              They must select a box on each turn, even if that means taking a
              zero on a category.
            </p>
            <p className='text-sm text-muted-foreground'>
              Tap each box only once, in any order, depending on your best
              scoring option.
            </p>

            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Scorecard Details
            </h3>
            <p className='text-sm text-muted-foreground'>
              The scorecard is divided into an Upper Section and a Lower
              Section.
            </p>
            <p className='text-sm text-muted-foreground'>
              The goal in the Upper Section is to score a total of at least 63
              points, to earn a 35-point bonus. The bonus points are based on
              scoring three of each number (Ones through Sixes); however, a
              player may earn the bonus with any combination of scores totaling
              63 points or more.
            </p>
            <div className='rounded-md border px-4 font-mono text-sm shadow-sm'>
              <Table className='my-2'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-primary bg-white sticky top-0 w-[130px]'>
                      Upper-Section
                    </TableHead>
                    <TableHead className='text-primary bg-white sticky top-0 text-right'>
                      Scoring
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Ones
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 1's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Twos
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 2's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Threes
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 3's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Fours
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 4's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Fives
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 5's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Sixes
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {"Sum of 6's"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium font-bold italic'>
                      {'Bonus'}
                    </TableCell>
                    <TableCell className='p-2 text-right font-bold'>
                      {'0 or 35'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className='text-sm text-muted-foreground'>
              The Lower Section is made up of the following categories:
            </p>
            <div className='rounded-md border px-4 font-mono text-sm shadow-sm'>
              <Table className='my-2'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-primary bg-white sticky top-0 w-[130px]'>
                      Lower-Section
                    </TableHead>
                    <TableHead className='text-primary bg-white sticky top-0 text-right'>
                      Scoring
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      3 of a Kind
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'Add all dice'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      4 of a Kind
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'Add all dice'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Full House
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'25 Pts'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Sm. Straight
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'30 Pts'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Lg. Straight
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'40 Pts'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Yachtsea
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'50 Pts'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='py-2 pl-2 font-medium text-muted-foreground'>
                      Chance
                    </TableCell>
                    <TableCell className='p-2 text-right text-muted-foreground'>
                      {'Add all dice'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Yachtsea and Bonus
            </h3>
            <p className='text-sm text-muted-foreground'>
              A Yachtsea is when a player rolls 5 of the same number, or a `5 of
              a Kind`.
            </p>
            <p className='text-sm text-muted-foreground'>
              The first Yachtsea marked in the Yachtsea box is worth 50 points.
              For each additional Yachtsea rolled, the player will earn a bonus.
            </p>
            <p className='text-sm text-muted-foreground'>
              If a player has 0 marked in the Yachtsea box and rolls a yachtsea,
              then there will be no bonus awarded. However, a player must fill
              in one of the 13 boxes on the scorecard according to the Joker
              Rules below.
            </p>

            <h3 className='text-lg font-semibold leading-none tracking-tight'>
              Joker Rules
            </h3>
            <p className='text-sm text-muted-foreground'>
              Mark the total of all 5 dice in the appropriate Upper Section box.
              If this box has already been filled in, score in any open Lower
              Section box.
            </p>
            <p className='text-sm text-muted-foreground'>
              If the appropriate Upper Section box and all Lower Section boxes
              are filled in, the player must enter a zero in any open Upper
              Section box.
            </p>
          </article>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
