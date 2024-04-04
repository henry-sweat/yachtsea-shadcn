import {
  addOnly,
  checkForMatchingNumbers,
  checkForFullHouse,
  checkForStraight,
  sumOfDiceValues,
} from '@/lib/potentialPointsFunctions';
import { PotentialPointsFn, RowID } from '@/types';

export const scorecardDetails: RowID[] = [
  'row-1',
  'row-2',
  'row-3',
  'row-4',
  'row-5',
  'row-6',
  'row-7',
  'row-8',
  'row-9',
  'row-10',
  'row-11',
  'row-12',
  'row-13',
];

interface IPotentialPointsFunctionsMappingMapping {
  [key: RowID]: PotentialPointsFn;
}

export const potentialPointsFunctionsMapping: IPotentialPointsFunctionsMappingMapping =
  {
    'row-1': addOnly(1),
    'row-2': addOnly(2),
    'row-3': addOnly(3),
    'row-4': addOnly(4),
    'row-5': addOnly(5),
    'row-6': addOnly(6),
    'row-7': checkForMatchingNumbers(3),
    'row-8': checkForMatchingNumbers(4),
    'row-9': checkForFullHouse(),
    'row-10': checkForStraight(4),
    'row-11': checkForStraight(5),
    'row-12': checkForMatchingNumbers(5),
    'row-13': sumOfDiceValues,
  };

export const yachtseaBonusSymbol = 'X';
