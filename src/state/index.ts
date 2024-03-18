import { create } from 'zustand';
import {
  RollDiceCommand,
  SelectDieCommand,
  SelectScorecardRowCommand,
  OpenRulesDrawerCommand,
  InitialGameState,
} from './commands';
import { startGame, endGame } from '@/db/actions';
import {
  generateInitialDiceValuesState,
  generateInitialScorecardState,
  generateInitialTotalsState,
  generateInitialYachtseaBonusOptionState,
} from '@/lib/initialStateFunctions';
import { checkForYachtseaFn } from '@/lib/potentialPointsFunctions';
import {
  IDie,
  IGameStore,
  IScorecard,
  IScorecardRow,
  ITotals,
  IYachtseaBonusOptions,
} from '@/types';

const useGameStore = create<IGameStore>((set, get) => ({
  user: undefined,
  currentGameState: new InitialGameState(),
  dice: generateInitialDiceValuesState(),
  scorecard: generateInitialScorecardState(),
  totals: generateInitialTotalsState(),
  rollCounter: 0,
  roundCounter: 0,
  rollButtonText: 'New Game',
  scorecardAccordionIsOpen: false,
  rulesDrawerIsOpen: false,
  diceAreRolling: false,

  // Actions
  handleRollButtonClicked: () => {
    const command = new RollDiceCommand(get());
    command.execute();
  },
  handleDieClicked: (indexOfClickedDie) => {
    const command = new SelectDieCommand(get(), indexOfClickedDie);
    command.execute();
  },
  handleScorecardRowClicked: (indexOfClickedRow) => {
    const command = new SelectScorecardRowCommand(get(), indexOfClickedRow);
    command.execute();
  },
  handleInfoIconClicked: () => {
    const command = new OpenRulesDrawerCommand(get());
    command.execute();
  },
  handleShowRulesButtonClicked: () => {
    const command = new OpenRulesDrawerCommand(get());
    command.execute();
  },
  // Helpers
  triggerDiceAnimation: () => {
    const { dice, setDice, setDiceAreRolling } = get();
    const rolls = 10;
    let shakeCount = 0;

    return new Promise((resolve) => {
      setDiceAreRolling(true);

      const intervalId = setInterval(() => {
        let newDice: IDie[] = getNewDiceValues(dice);
        setDice(newDice);
        shakeCount += 1;
        if (shakeCount >= rolls) {
          clearInterval(intervalId);
          setDiceAreRolling(false);

          resolve();
        }
      }, 100);
    });
  },
  openScorecardAccordion: () => {
    get().setScorecardAccordionIsOpen(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  },
  closeScorecardAccordion: (): Promise<void> => {
    get().setScorecardAccordionIsOpen(false);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 450);
    });
  },
  openRulesDrawer: () => {
    get().setRulesDrawerIsOpen(true);
  },
  closeRulesDrawer: () => {
    get().setRulesDrawerIsOpen(false);
  },
  updateScorecardForDiceRoll: () => {
    const { dice, scorecard, setScorecard } = get();
    const newScorecard = updateScorecard(dice, scorecard);
    setScorecard(newScorecard);
  },
  updateScorecardForScorecardRowSelection: (indexOfClickedRow) => {
    const { scorecard, setScorecard } = get();
    let newScorecard: IScorecard = { ...scorecard };
    newScorecard.rows[indexOfClickedRow].earnedPoints =
      newScorecard.rows[indexOfClickedRow].potentialPoints;
    newScorecard.yachtseaBonus.yachtseaBonusOptions =
      generateInitialYachtseaBonusOptionState();
    setScorecard(newScorecard);
  },
  resetScorecard: () => {
    const { setScorecard } = get();
    setScorecard(generateInitialScorecardState());
  },
  updateTotals: () => {
    const { scorecard, setTotals } = get();
    let newTotals: ITotals = calculateTotals(scorecard);
    setTotals(newTotals);
  },
  selectAllDice: () => {
    const { dice, setDice } = get();
    const newDice = dice.map((die) => ({
      id: die.id,
      value: die.value,
      isSelected: true,
    }));
    setDice(newDice);
  },
  unselectAllDice: () => {
    const { dice, setDice } = get();
    const newDice = dice.map((die) => ({
      id: die.id,
      value: die.value,
      isSelected: false,
    }));
    setDice(newDice);
  },
  selectDie: (indexOfClickedDie) => {
    const { dice, setDice } = get();
    let newDice = [...dice];
    newDice[indexOfClickedDie].isSelected =
      !newDice[indexOfClickedDie].isSelected;
    setDice(newDice);
  },
  updateUser: (session) => {
    const { setUser } = get();
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
    return {};
  },
  startGameInDatabase: () => {
    const { user } = get();
    if (user?.email) {
      startGame(user.email);
    } else {
      return;
    }
  },
  endGameInDatabase: () => {
    const { user, totals } = get();
    if (user?.email) {
      endGame(user.email, totals.grandTotal);
    } else {
      return;
    }
  },

  // Setters
  setUser: (newUser) => set({ user: newUser }),
  setCurrentGameState: (newGameState) =>
    set({ currentGameState: newGameState }),
  setDice: (newDice) => set({ dice: newDice }),
  setScorecard: (newScorecard) => set({ scorecard: newScorecard }),
  setTotals: (newTotals) => set({ totals: newTotals }),
  setRollCounter: (nextRoll) => set({ rollCounter: nextRoll }),
  setRoundCounter: (nextRound) => set({ roundCounter: nextRound }),
  setRollButtonText: (newText) => set({ rollButtonText: newText }),
  setScorecardAccordionIsOpen: (bool) =>
    set({ scorecardAccordionIsOpen: bool }),
  setRulesDrawerIsOpen: (bool) => set({ rulesDrawerIsOpen: bool }),
  setDiceAreRolling: (bool) => set({ diceAreRolling: bool }),
}));

export default useGameStore;

// External Helper Functions
function updateScorecard(dice: IDie[], scorecard: IScorecard) {
  const newYachtseaBonusOptions: IYachtseaBonusOptions =
    updateYachtseaBonusOptions(dice, scorecard);

  return {
    rows: scorecard.rows.map((row, idx): IScorecardRow => {
      const earnedPoints = row?.earnedPoints ?? -1;
      if (earnedPoints >= 0) {
        return row;
      } else {
        return {
          id: row.id,
          earnedPoints: row.earnedPoints,
          potentialPoints: row.potentialPointsFunction(
            dice,
            newYachtseaBonusOptions[idx]
          ),
          potentialPointsFunction: row.potentialPointsFunction,
        };
      }
    }),
    yachtseaBonus: {
      numberOfBonuses:
        scorecard.yachtseaBonus.numberOfBonuses +
        (checkYachtseaBonusConditions(dice, scorecard) ? 1 : 0),
      yachtseaBonusOptions: newYachtseaBonusOptions,
    },
  };
}

function calculateTotals(scorecard: IScorecard): ITotals {
  const [upperSectionSubtotal, upperSectionBonus, upperSectionTotal] =
    calculateUpperSectionTotals(scorecard);
  const [yachtseaBonus, lowerSectionTotal] =
    calculateLowerSectionTotals(scorecard);
  return {
    upperSectionSubTotal: upperSectionSubtotal,
    upperSectionBonus: upperSectionBonus,
    upperSectionTotal: upperSectionTotal,
    yachtseaBonusTotal: yachtseaBonus,
    lowerSectionTotal: lowerSectionTotal,
    grandTotal: upperSectionTotal + lowerSectionTotal,
  };
}

function calculateUpperSectionTotals(scorecard: IScorecard) {
  const upperSectionIndexes = [0, 1, 2, 3, 4, 5];
  const upperSectionSubtotal = upperSectionIndexes.reduce((acc, idx) => {
    const earnedPoints = scorecard?.rows[idx].earnedPoints ?? -1;
    if (earnedPoints >= 0) {
      return acc + earnedPoints;
    } else return acc;
  }, 0);
  const upperSectionBonus = upperSectionSubtotal >= 63 ? 35 : 0;
  const upperSectionTotal = upperSectionSubtotal + upperSectionBonus;
  return [upperSectionSubtotal, upperSectionBonus, upperSectionTotal];
}

function calculateLowerSectionTotals(scorecard: IScorecard) {
  const lowerSectionIndexes = [6, 7, 8, 9, 10, 11, 12];
  const lowerSectionSubtotal = lowerSectionIndexes.reduce((acc, idx) => {
    const earnedPoints = scorecard?.rows[idx].earnedPoints ?? -1;
    if (earnedPoints >= 0) {
      return acc + earnedPoints;
    } else return acc;
  }, 0);
  const yachtseaBonus = scorecard.yachtseaBonus.numberOfBonuses * 100;
  const lowerSectionTotal = lowerSectionSubtotal + yachtseaBonus;
  return [yachtseaBonus, lowerSectionTotal];
}

function updateYachtseaBonusOptionsForYachtsea(
  dice: IDie[],
  scorecard: IScorecard
): IYachtseaBonusOptions {
  const yachtseaNumber = dice[0].value;
  const upperSectionIndex = yachtseaNumber - 1;
  const newYachtseaBonusOptions = [
    ...scorecard.yachtseaBonus.yachtseaBonusOptions,
  ];

  if (!scorecard.rows[upperSectionIndex].earnedPoints) {
    newYachtseaBonusOptions[upperSectionIndex] = true;
  } else {
    let lowerSectionIsOpen = false;
    const lowerSectionIndexes = [6, 7, 8, 9, 10, 11, 12];
    lowerSectionIndexes.forEach((scorecardRowIndex) => {
      if (!scorecard.rows[scorecardRowIndex].earnedPoints) {
        newYachtseaBonusOptions[scorecardRowIndex] = true;
        if (!lowerSectionIsOpen) {
          lowerSectionIsOpen = true;
        }
      }
    });

    if (!lowerSectionIsOpen) {
      const upperSectionIndexes = [0, 1, 2, 3, 4, 5];
      upperSectionIndexes.forEach((scorecardRowIndex) => {
        if (!scorecard.rows[scorecardRowIndex].earnedPoints) {
          newYachtseaBonusOptions[scorecardRowIndex] = true;
        }
      });
    }
  }

  return newYachtseaBonusOptions;
}

function updateYachtseaBonusOptions(dice: IDie[], scorecard: IScorecard) {
  return checkYachtseaBonusConditions(dice, scorecard)
    ? updateYachtseaBonusOptionsForYachtsea(dice, scorecard)
    : scorecard.yachtseaBonus.yachtseaBonusOptions;
}

function checkYachtseaBonusConditions(dice: IDie[], scorecard: IScorecard) {
  return checkForYachtseaFn(dice) && scorecard.rows[11].earnedPoints === 50;
}

function getNewDiceValues(dice: IDie[]): IDie[] {
  return dice.map((die) => ({
    id: die.id,
    value: die.isSelected ? die.value : rollSixSidedDie(),
    isSelected: die.isSelected,
  }));
}

function rollSixSidedDie(): number {
  return Math.ceil(Math.random() * 6);
}
