import { create } from 'zustand';
import {
  generateInitialDiceValuesState,
  generateInitialScorecardState,
  generateInitialTotalsState,
} from '@/stores/initialStateFunctions';
import { checkForYachtseaFn } from '@/lib/potentialPointsFunctions';
import {
  IGameState,
  IScorecard,
  IScorecardRow,
  IDie,
  ITotals,
  IUser,
} from '@/types';

const useGameStateStore = create<IGameState>((set) => ({
  rollCounter: 0,
  roundCounter: 1,
  diceAreRolling: false,
  scorecardAccordionIsOpen: false,
  dice: generateInitialDiceValuesState(),
  scorecard: generateInitialScorecardState(),
  totals: generateInitialTotalsState(),
  userHasSelectedPoints: false,
  actions: {
    updateGameStateForRollButtonClicked: () =>
      set(
        ({
          rollCounter,
          roundCounter,
          scorecardAccordionIsOpen,
          dice,
          scorecard,
          userHasSelectedPoints,
          actions,
          setters,
        }) => {
          const { updateRollCounter, updateRoundCounter } = actions;
          const {
            setDice,
            setDiceAreRolling,
            setScorecardAccordionIsOpen,
            setScorecard,
            setUserHasSelectedPoints,
            setTotals,
          } = setters;

          if (rollCounter === 3 && !userHasSelectedPoints) {
            return {};
          }

          updateRollCounter();

          if (!scorecardAccordionIsOpen) {
            setScorecardAccordionIsOpen(true);
          }

          if (userHasSelectedPoints) {
            updateRoundCounter();
            setUserHasSelectedPoints(false);
          }

          setDiceAreRolling(true);

          if (userHasSelectedPoints && roundCounter === 13) {
            setScorecardAccordionIsOpen(false);
          }

          const rolls = 10;
          let shakeCount = 0;

          const intervalId = setInterval(() => {
            let newDice: IDie[] = userHasSelectedPoints
              ? rollAndResetAllDice(dice)
              : rollUnselectedDice(dice, rollCounter, shakeCount);

            setDice(newDice);

            shakeCount += 1;

            if (shakeCount >= rolls) {
              clearInterval(intervalId);
              setDiceAreRolling(false);
              let newScorecard: IScorecard =
                userHasSelectedPoints && roundCounter === 13
                  ? resetScorecardWithNewDice(newDice, scorecard)
                  : updateScorecardForLatestRoll(newDice, scorecard);

              if (userHasSelectedPoints && roundCounter === 13) {
                setTotals(generateInitialTotalsState());
                setScorecard(newScorecard);
                setScorecardAccordionIsOpen(true);
              } else {
                setScorecard(newScorecard);
              }
            }
          }, 100);

          return {};
        }
      ),
    updateDiceStateForDieClicked: (indexOfClickedDie) =>
      set(({ dice, setters }) => {
        const { setDice } = setters;
        let newDice: IDie[] = [...dice];
        newDice[indexOfClickedDie].isSelected =
          !newDice[indexOfClickedDie].isSelected;
        setDice(newDice);
        return {};
      }),
    updateGameStateForPointsClicked: (indexOfClickedRow) =>
      set(({ roundCounter, dice, scorecard, actions, setters }) => {
        const { updateTotals } = actions;
        const { setDice, setScorecard, setUserHasSelectedPoints } = setters;

        let newScorecard: IScorecard = { ...scorecard };

        newScorecard.rows[indexOfClickedRow].earnedPoints =
          newScorecard.rows[indexOfClickedRow].potentialPoints;

        let newDice: IDie[] = selectAllDice(dice);

        setDice(newDice);
        setScorecard(newScorecard);
        updateTotals(newScorecard);
        setUserHasSelectedPoints(true);

        return {};
      }),
    updateTotals: (scorecard: IScorecard) =>
      set(({ setters }) => {
        const { setTotals } = setters;
        let newTotals: ITotals = calculateTotalsWithScorecard(scorecard);
        setTotals(newTotals);
        return {};
      }),
    updateRollCounter: () =>
      set(({ rollCounter, userHasSelectedPoints, setters }) => {
        const { setRollCounter } = setters;
        if (rollCounter < 3 && !userHasSelectedPoints) {
          setRollCounter(rollCounter + 1);
        } else {
          setRollCounter(1);
        }
        return {};
      }),
    updateRoundCounter: () =>
      set(({ roundCounter, setters }) => {
        const { setRoundCounter } = setters;
        if (roundCounter < 13) {
          setRoundCounter(roundCounter + 1);
        } else {
          setRoundCounter(1);
        }
        return {};
      }),
  },

  setters: {
    setRollCounter: (nextRoll: number) => set({ rollCounter: nextRoll }),
    setRoundCounter: (nextRound: number) => set({ roundCounter: nextRound }),
    setDiceAreRolling: (bool: boolean) => set({ diceAreRolling: bool }),
    setScorecardAccordionIsOpen: (bool: boolean) =>
      set({ scorecardAccordionIsOpen: bool }),
    setDice: (newDice: IDie[]) => set({ dice: newDice }),
    setScorecard: (newScorecard: IScorecard) =>
      set({ scorecard: newScorecard }),
    setTotals: (newTotals: ITotals) => set({ totals: newTotals }),
    setUserHasSelectedPoints: (bool: boolean) =>
      set({ userHasSelectedPoints: bool }),
  },
}));

export default useGameStateStore;

export const useGameActions = () => useGameStateStore((state) => state.actions);

// HELPER FUNCTIONS
function rollAndResetAllDice(dice: IDie[]): IDie[] {
  return dice.map((die) => ({
    id: die.id,
    value: rollSixSidedDie(),
    isSelected: false,
  }));
}

function rollUnselectedDice(
  dice: IDie[],
  rollCounter: number,
  shakeCount: number
): IDie[] {
  return dice.map((die) => ({
    id: die.id,
    value: die.isSelected ? die.value : rollSixSidedDie(),
    isSelected:
      rollCounter + 1 === 3 && shakeCount >= 9 ? true : die.isSelected,
  }));
}

function selectAllDice(dice: IDie[]): IDie[] {
  return dice.map(
    (die: IDie): IDie => ({
      id: die.id,
      value: die.value,
      isSelected: true,
    })
  );
}

function resetScorecardWithNewDice(
  newDice: IDie[],
  oldScorecard: IScorecard
): IScorecard {
  return {
    rows: oldScorecard.rows.map(
      (row: IScorecardRow): IScorecardRow => ({
        id: row.id,
        earnedPoints: undefined,
        potentialPoints: row.potentialPointsFunction(newDice),
        potentialPointsFunction: row.potentialPointsFunction,
      })
    ),
    yachtseaBonus: { numberOfBonuses: 0 },
  };
}

function updateScorecardForLatestRoll(
  newDice: IDie[],
  oldScorecard: IScorecard
): IScorecard {
  return {
    rows: oldScorecard.rows.map((row): IScorecardRow => {
      if (row.earnedPoints >= 0) {
        return row;
      } else {
        return {
          id: row.id,
          earnedPoints: row.earnedPoints,
          potentialPoints: row.potentialPointsFunction(newDice),
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
    },
  };
}

function calculateTotalsWithScorecard(scorecard: IScorecard): ITotals {
  const [upperSectionSubtotal, upperSectionBonus, upperSectionTotal] =
    calculateUpperSectionTotalsWithScorecard(scorecard);
  const [yachtseaBonus, lowerSectionTotal] =
    calculateLowerSectionTotalsWithScorecard(scorecard);
  return {
    upperSectionSubTotal: upperSectionSubtotal,
    upperSectionBonus: upperSectionBonus,
    upperSectionTotal: upperSectionTotal,
    yachtseaBonusTotal: yachtseaBonus,
    lowerSectionTotal: lowerSectionTotal,
    grandTotal: upperSectionTotal + lowerSectionTotal,
  };
}

function calculateUpperSectionTotalsWithScorecard(scorecard: IScorecard) {
  const upperSectionIndexes = [0, 1, 2, 3, 4, 5];
  const upperSectionSubtotal = upperSectionIndexes.reduce((acc, idx) => {
    if (scorecard.rows[idx].earnedPoints >= 0) {
      return acc + scorecard.rows[idx].earnedPoints;
    } else return acc;
  }, 0);
  const upperSectionBonus = upperSectionSubtotal >= 63 ? 35 : 0;
  const upperSectionTotal = upperSectionSubtotal + upperSectionBonus;
  return [upperSectionSubtotal, upperSectionBonus, upperSectionTotal];
}

function calculateLowerSectionTotalsWithScorecard(scorecard: IScorecard) {
  const lowerSectionIndexes = [6, 7, 8, 9, 10, 11, 12];
  const lowerSectionSubtotal = lowerSectionIndexes.reduce((acc, idx) => {
    if (scorecard.rows[idx].earnedPoints >= 0) {
      return acc + scorecard.rows[idx].earnedPoints;
    } else return acc;
  }, 0);
  const yachtseaBonus = scorecard.yachtseaBonus.numberOfBonuses * 100;
  const lowerSectionTotal = lowerSectionSubtotal + yachtseaBonus;
  return [yachtseaBonus, lowerSectionTotal];
}

function rollSixSidedDie(): number {
  return Math.ceil(Math.random() * 6);
}
