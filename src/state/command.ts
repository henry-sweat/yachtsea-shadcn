import { create } from 'zustand';
import {
  generateInitialDiceValuesState,
  generateInitialScorecardState,
} from '@/stores/initialStateFunctions';
import { checkForYachtseaFn } from '@/lib/potentialPointsFunctions';
import { IDie, IScorecard } from './types';

class NewGamePendingState {
  rollDice(store) {
    store.toggleScorecardAccordion();
    store.setRollButtonText('Roll');
    store.setRollCounter(1);
    store.setRoundCounter(1);
    store.toggleDiceAnimationThenUpdateScorecard();
    store.setCurrentGameState(new AwaitingSecondRollOrScoreSelectionState());
  }
}

class AwaitingSecondRollOrScoreSelectionState {
  rollDice() {
    console.log('try clicking some dice...');
  }
}

export const useGameStore = create((set, get) => ({
  currentGameState: new NewGamePendingState(),
  dice: generateInitialDiceValuesState(),
  scorecard: generateInitialScorecardState(),
  rollCounter: 0,
  roundCounter: 0,
  rollButtonText: 'New Game',
  scorecardAccordionIsOpen: false,
  diceAreRolling: false,

  // Actions mapped to commands
  handleRollButtonClicked: () => {
    const command = new RollDiceCommand(get());
    command.execute();
  },
  handleDieClicked: () => {},
  handleScorecardRowClicked: () => {},

  // Helpers
  toggleDiceAnimationThenUpdateScorecard: () => {
    const { setDice, setDiceAreRolling, updateScorecard } = get();
    const rolls = 10;
    let shakeCount = 0;

    setTimeout(() => {
      setDiceAreRolling(true);

      const intervalId = setInterval(() => {
        let newDice: IDie[] = rollAndResetAllDice();
        setDice(newDice);
        shakeCount += 1;
        if (shakeCount >= rolls) {
          clearInterval(intervalId);
          setDiceAreRolling(false);

          updateScorecard();
        }
      }, 100);
    }, 300);
  },
  toggleScorecardAccordion: () => {
    const { scorecardAccordionIsOpen, setScorecardAccordionIsOpen } = get();
    if (!scorecardAccordionIsOpen) {
      setScorecardAccordionIsOpen(true);
    } else {
      setScorecardAccordionIsOpen(false);
      setTimeout(() => {
        setScorecardAccordionIsOpen(true);
      }, 500);
    }
  },
  updateScorecard: () => {
    const { dice, scorecard, setScorecard } = get();
    let newScorecard: IScorecard = updateScorecardForLatestRoll(
      dice,
      scorecard
    );

    setScorecard(newScorecard!);
  },

  // Setters
  setCurrentGameState: (newGameState) =>
    set({ currentGameState: newGameState }),
  setDice: (newDice) => set({ dice: newDice }),
  setScorecard: (newScorecard) => set({ scorecard: newScorecard }),
  setRollCounter: (nextRoll) => set({ rollCounter: nextRoll }),
  setRoundCounter: (nextRound) => set({ roundCounter: nextRound }),
  setRollButtonText: (newText) => set({ rollButtonText: newText }),
  setScorecardAccordionIsOpen: (bool) =>
    set({ scorecardAccordionIsOpen: bool }),
  setDiceAreRolling: (bool) => set({ diceAreRolling: bool }),
}));

// Adjust the command implementations to use the Zustand store
class RollDiceCommand {
  constructor(private store) {}

  execute() {
    this.store.currentGameState.rollDice(this.store);
  }
}

// HELPERS

function updateScorecardForLatestRoll(
  newDice: IDie[],
  oldScorecard: IScorecard
): IScorecard {
  const newYachtseaBonusOptions =
    checkForYachtseaFn(newDice) && oldScorecard.rows[11].earnedPoints === 50
      ? updateYachtseaBonusOptionsForYachtsea(newDice, oldScorecard)
      : oldScorecard.yachtseaBonus.yachtseaBonusOptions;

  const newScorecard = {
    rows: oldScorecard.rows.map((row, idx): IScorecardRow => {
      const earnedPoints = row?.earnedPoints ?? -1;
      if (earnedPoints >= 0) {
        return row;
      } else {
        return {
          id: row.id,
          earnedPoints: row.earnedPoints,
          potentialPoints: row.potentialPointsFunction(
            newDice,
            newYachtseaBonusOptions[idx]
          ),
          potentialPointsFunction: row.potentialPointsFunction,
        };
      }
    }),
    yachtseaBonus: {
      numberOfBonuses:
        oldScorecard.yachtseaBonus.numberOfBonuses +
        (oldScorecard.rows[11].earnedPoints === 50
          ? checkForYachtseaFn(newDice) === 50
            ? 1
            : 0
          : 0),
      yachtseaBonusOptions: newYachtseaBonusOptions,
    },
  };

  return newScorecard;
}

function updateYachtseaBonusOptionsForYachtsea(
  newDice: IDie[],
  oldScorecard: IScorecard
): IYachtseaBonusOptions {
  const yachtseaNumber = newDice[0].value;
  const scorecardRowIndex = yachtseaNumber - 1;
  const newYachtseaBonusOptions = [
    ...oldScorecard.yachtseaBonus.yachtseaBonusOptions,
  ];

  if (!oldScorecard.rows[scorecardRowIndex].earnedPoints) {
    newYachtseaBonusOptions[scorecardRowIndex] = true;
  } else {
    let lowerSectionIsOpen = false;
    const lowerSectionIndexes = [6, 7, 8, 9, 10, 11, 12];
    lowerSectionIndexes.forEach((scorecardRowIndex) => {
      if (!oldScorecard.rows[scorecardRowIndex].earnedPoints) {
        newYachtseaBonusOptions[scorecardRowIndex] = true;
        if (!lowerSectionIsOpen) {
          lowerSectionIsOpen = true;
        }
      }
    });

    if (!lowerSectionIsOpen) {
      const upperSectionIndexes = [0, 1, 2, 3, 4, 5];
      upperSectionIndexes.forEach((scorecardRowIndex) => {
        if (!oldScorecard.rows[scorecardRowIndex].earnedPoints) {
          newYachtseaBonusOptions[scorecardRowIndex] = true;
        }
      });
    }
  }

  return newYachtseaBonusOptions;
}

function rollAndResetAllDice(): IDie[] {
  const dice = [1, 2, 3, 4, 5];
  return dice.map((dieNumber) => ({
    id: `die-${dieNumber}`,
    value: rollSixSidedDie(),
    isSelected: false,
  }));
}

function rollSixSidedDie(): number {
  return Math.ceil(Math.random() * 6);
}
