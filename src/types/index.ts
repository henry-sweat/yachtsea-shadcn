import { Memento } from '@/state/commands';
import type { Session, User } from 'next-auth';

export interface IGameStore {
  user: undefined | null | User;
  currentGameState: IGameState;
  rollCounter: number;
  roundCounter: number;
  diceAreRolling: boolean;
  scorecardAccordionIsOpen: boolean;
  rulesDrawerIsOpen: boolean;
  rollButtonText: string;
  rollButtonPulse: boolean;
  dice: IDie[];
  scorecard: IScorecard;
  totals: ITotals;
  mostRecentScorecardRowSelectionCommand: ICommand | null;

  handleRollButtonClicked: () => void;
  handleDieClicked: (indexOfClickedDie: number) => void;
  handleScorecardRowClicked: (indexOfClickedRow: number) => void;
  handleInfoButtonClicked: () => void;
  handleShowRulesButtonClicked: () => void;
  handleRulesDrawerClosed: () => void;
  handleUndoButtonClicked: () => void;
  handleRestartGameButtonClicked: () => void;

  triggerDiceAnimation: () => Promise<void>;
  openScorecardAccordion: () => Promise<void>;
  closeScorecardAccordion: () => Promise<void>;
  openRulesDrawer: () => void;
  closeRulesDrawer: () => void;
  updateScorecardForDiceRoll: () => void;
  updateScorecardForScorecardRowSelection: (indexOfClickedRow: number) => void;
  resetScorecard: () => void;
  updateTotals: () => void;
  selectAllDice: () => void;
  unselectAllDice: () => void;
  unselectAllDiceAsync: () => Promise<void>;
  selectDie: (indexOfClickedDie: number) => void;
  updateUser: (session: Session | null) => void;
  startGameInDatabase: () => void;
  endGameInDatabase: () => void;
  toggleRollButtonPulse: () => void;
  createSnapshot: () => Memento;
  addCommandToHistory: (command: ICommand) => void;
  removeCommandFromHistory: () => void;
  restoreStateFromSnapshot: (snapshot: Memento) => void;

  setCurrentGameState: (newGameState: IGameState) => void;
  setRollCounter: (nextRoll: number) => void;
  setRoundCounter: (nextRound: number) => void;
  setDiceAreRolling: (bool: boolean) => void;
  setScorecardAccordionIsOpen: (bool: boolean) => void;
  setRulesDrawerIsOpen: (bool: boolean) => void;
  setRollButtonText: (newText: string) => void;
  setRollButtonPulse: (bool: boolean) => void;
  setDice: (newDice: IDie[]) => void;
  setScorecard: (newScorecard: IScorecard) => void;
  setTotals: (newTotals: ITotals) => void;
  setUser: (newUser: User | null) => void;
  setMostRecentScorecardRowSelectionCommand: (command: ICommand | null) => void;
}

export interface IGameState {
  rollDice(store: IGameStore): void;
  selectDie(store: IGameStore, indexOfClickedDie: number): void;
  selectScorecardRow(store: IGameStore, indexOfClickedRow: number): void;
  openRulesDrawer(store: IGameStore): void;
  closeRulesDrawer(store: IGameStore): void;
  restartGame(store: IGameStore): void;
}

export interface ICommand {
  execute(): void;
  undo?(): void;
}

export interface IScorecard {
  rows: Array<IScorecardRow>;
  yachtseaBonus: IScorecardYachtseaBonus;
}

export interface IScorecardRow {
  id: RowID;
  earnedPoints: undefined | number;
  potentialPoints: undefined | number;
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

export type RowID = `row-${number}`;

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
