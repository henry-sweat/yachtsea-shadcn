import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

export default function Scorecard() {
  const [marked, setMarked] = useState(true);

  return (
    <div className='flex flex-col justify-center rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
      <div className='flex justify-between'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Upper</TableHead>
              <TableHead className='text-right'>Pts.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upperScorecardRows.map((row) => (
              <TableRow key={`scorecard-row-key${row.id}`}>
                <TableCell className='font-medium'>{row.category}</TableCell>
                <TableCell className='text-right'>{row.pointsEarned}</TableCell>
              </TableRow>
            ))}
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
            {lowerScorecardRows.map((row) => (
              <TableRow key={`scorecard-row-key${row.id}`}>
                <TableCell className='font-medium'>{row.category}</TableCell>
                <TableCell className='text-right'>{row.pointsEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TableCaption className='mt-0'>
        Your total score is <strong>295</strong> points.
      </TableCaption>
    </div>
    // <Accordion type='single' collapsible>
    //   <AccordionItem value='item-1'>
    //     <AccordionTrigger className='hover:no-underline space-x-2'>
    //       <Card
    //         id='scorecardPreview'
    //         className='flex items-center justify-center w-full'
    //       >
    //         <CardContent className='py-2 px-4 flex justify-between items-center w-full font-mono text-muted-foreground/50'>
    //           <div>
    //             <p className={marked ? 'text-primary font-bold' : ''}>1</p>
    //           </div>
    //           <div>
    //             <p>2</p>
    //           </div>
    //           <div>
    //             <p>3</p>
    //           </div>
    //           <div>
    //             <p>4</p>
    //           </div>
    //           <div>
    //             <p>5</p>
    //           </div>
    //           <div>
    //             <p>6</p>
    //           </div>

    //           <div>
    //             <p>{'3K'}</p>
    //           </div>
    //           <div>
    //             <p>{'4K'}</p>
    //           </div>
    //           <div>
    //             <p>{'FH'}</p>
    //           </div>
    //           <div>
    //             <p>{'S'}</p>
    //           </div>
    //           <div>
    //             <p>{'L'}</p>
    //           </div>
    //           <div>
    //             <p>{'Y'}</p>
    //           </div>
    //           <div>
    //             <p>{'C'}</p>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </AccordionTrigger>
    //     <AccordionContent>
    //       <div className='flex flex-col justify-center rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>
    //         <div className='flex justify-between'>
    //           <Table>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead className='w-[100px]'>Upper</TableHead>
    //                 <TableHead className='text-right'>Pts.</TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {upperScorecardRows.map((row) => (
    //                 <TableRow key={`scorecard-row-key${row.id}`}>
    //                   <TableCell className='font-medium'>
    //                     {row.category}
    //                   </TableCell>
    //                   <TableCell className='text-right'>
    //                     {row.pointsEarned}
    //                   </TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //           <Table>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead className='w-[100px]'>Lower</TableHead>
    //                 <TableHead className='text-right'>Pts.</TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {lowerScorecardRows.map((row) => (
    //                 <TableRow key={`scorecard-row-key${row.id}`}>
    //                   <TableCell className='font-medium'>
    //                     {row.category}
    //                   </TableCell>
    //                   <TableCell className='text-right'>
    //                     {row.pointsEarned}
    //                   </TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </div>
    //         <TableCaption className='mt-0'>
    //           Your total score is <strong>295</strong> points.
    //         </TableCaption>
    //       </div>
    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
  );
}

const upperScorecardRows = [
  {
    id: 1,
    category: 'Ones',
    pointsEarned: 3,
  },
  {
    id: 2,
    category: 'Twos',
    pointsEarned: 6,
  },
  {
    id: 3,
    category: 'Threes',
    pointsEarned: 9,
  },
  {
    id: 4,
    category: 'Fours',
    pointsEarned: 12,
  },
  {
    id: 5,
    category: 'Fives',
    pointsEarned: 15,
  },
  {
    id: 6,
    category: 'Sixes',
    pointsEarned: 18,
  },
  {
    id: 7,
    category: 'Bonus ✅',
    pointsEarned: '35/35',
  },
  {
    id: 8,
    category: 'Upper Total',
    pointsEarned: 98,
  },
];

const lowerScorecardRows = [
  {
    id: 9,
    category: 'Set of 3',
    pointsEarned: 17,
  },
  {
    id: 10,
    category: 'Set of 4',
    pointsEarned: 19,
  },
  {
    id: 11,
    category: 'Full Haus',
    pointsEarned: 25,
  },
  {
    id: 12,
    category: 'Sm. Str.',
    pointsEarned: 30,
  },
  {
    id: 13,
    category: 'Lg. Str.',
    pointsEarned: 40,
  },
  {
    id: 14,
    category: 'Yachtsea',
    pointsEarned: 50,
  },
  {
    id: 15,
    category: 'Chance',
    pointsEarned: 16,
  },
  {
    id: 16,
    category: 'Lower Total',
    pointsEarned: 197,
  },
];
