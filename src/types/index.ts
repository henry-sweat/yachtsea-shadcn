import type { Session, User } from 'next-auth';

export interface IGameState {
  user: undefined | null | User;
  rollCounter: number;
  roundCounter: number;
  diceAreRolling: boolean;
  scorecardAccordionIsOpen: boolean;
  rulesDrawerIsOpen: boolean;
  rollButtonText: string;
  dice: IDie[];
  scorecard: IScorecard;
  totals: ITotals;
  userHasSelectedPoints: boolean;
  actions: {
    updateGameStateForRollButtonClicked: () => void;
    updateDiceStateForDieClicked: (indexOfClickedDie: number) => void;
    updateGameStateForPointsClicked: (indexOfClickedRow: number) => void;
    updateTotals: (scorecard: IScorecard) => void;
    updateRollCounter: () => void;
    updateRoundCounter: () => void;
    updateUser: (session: Session | null) => void;
    updateRulesDrawerIsOpen: () => void;
  };
  setters: {
    setRollCounter: (nextRoll: number) => void;
    setRoundCounter: (nextRound: number) => void;
    setDiceAreRolling: (bool: boolean) => void;
    setScorecardAccordionIsOpen: (bool: boolean) => void;
    setRulesDrawerIsOpen: (bool: boolean) => void;
    setRollButtonText: (newText: string) => void;
    setDice: (newDice: IDie[]) => void;
    setScorecard: (newScorecard: IScorecard) => void;
    setTotals: (newTotals: ITotals) => void;
    setUserHasSelectedPoints: (bool: boolean) => void;
    setUser: (newUser: User | null) => void;
  };
}

export interface IScorecard {
  rows: Array<IScorecardRow>;
  yachtseaBonus: IScorecardYachtseaBonus;
}

export interface IScorecardRow {
  id: string;
  earnedPoints: undefined | number;
  potentialPoints: undefined | number;
  potentialPointsFunction: Function;
}

export interface IScorecardYachtseaBonus {
  numberOfBonuses: number;
  yachtseaBonusOptions: IYachtseaBonusOptions;
}

export interface IDie {
  id: string;
  value: number;
  isSelected: boolean;
}

export interface ITotals {
  upperSectionSubTotal: number;
  upperSectionBonus: number;
  upperSectionTotal: number;
  yachtseaBonusTotal: number;
  lowerSectionTotal: number;
  grandTotal: number;
}

export type IYachtseaBonusOptions = boolean[];

export type PotentialPointsFn = (
  diceValues: IDie[],
  isYachtseaBonusOption?: boolean
) => number;

// PROP TYPES

export interface IDieProps {
  diceStateIndex: number;
}

export interface ICounterProps {
  type: string;
  counter: number;
  denominator: number;
}

export interface IStatsProps {
  highScore: number;
  totalGamesStarted: number;
  totalGamesFinished: number;
  averageScore: number;
}
