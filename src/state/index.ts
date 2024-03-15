import { create } from 'zustand';
import {
  generateInitialDiceValuesState,
  generateInitialScorecardState,
  generateInitialTotalsState,
  generateInitialYachtseaBonusOptionState,
} from '@/stores/initialStateFunctions';
import { checkForYachtseaFn } from '@/lib/potentialPointsFunctions';
import { startGame, endGame } from '@/db/actions';
import {
  IGameStore,
  IScorecard,
  IScorecardRow,
  IDie,
  ITotals,
  IYachtseaBonusOptions,
  GameState,
} from './types';

const useGameStore = create<IGameStore>((set) => ({
  gameState: GameState.NewGamePending,
  user: undefined,
  rollCounter: 0,
  roundCounter: 0,
  diceAreRolling: false,
  scorecardAccordionIsOpen: false,
  rulesDrawerIsOpen: false,
  rollButtonText: 'New Game',
  dice: undefined,
  scorecard: undefined,
  totals: generateInitialTotalsState(),
  userHasSelectedPoints: false,
  actions: {
    handleRollButtonClicked: () =>
      set(
        ({
          gameState,
          user,
          dice,
          scorecardAccordionIsOpen,
          scorecard,
          actions,
          setters,
        }) => {
          const { updateRollCounter, updateRoundCounter } = actions;
          const {
            setDice,
            setDiceAreRolling,
            setScorecardAccordionIsOpen,
            setRollButtonText,
            setScorecard,
            setUserHasSelectedPoints,
            setTotals,
          } = setters;

          if (
            gameState === GameState.AwaitingScoreSelection ||
            gameState === GameState.AwaitingFinalScoreSelection ||
            gameState === GameState.DiceAreRolling
          ) {
            return {};
          }

          updateRollCounter();

          switch (gameState) {
            case GameState.NewGamePending:
              setRollButtonText('Roll');
              updateRoundCounter();

              if (user?.email) {
                startGame(user.email);
              }
              if (scorecardAccordionIsOpen) {
                setScorecardAccordionIsOpen(true);
              } else {
                setScorecardAccordionIsOpen(false);
                setTimeout(() => {
                  setScorecardAccordionIsOpen(true);
                }, 500);
              }
              break;
            case GameState.RoundIsOver:
              updateRoundCounter();
              break;
          }

          const rolls = 10;
          let shakeCount = 0;

          const timeoutId = setTimeout(
            () => {
              setDiceAreRolling(true);

              const intervalId = setInterval(() => {
                let newDice: IDie[] =
                  gameState === GameState.RoundIsOver
                    ? rollAndResetAllDice()
                    : rollUnselectedDice(dice);

                setDice(newDice);

                shakeCount += 1;

                if (shakeCount >= rolls) {
                  clearInterval(intervalId);
                  setDiceAreRolling(false);

                  if (
                    gameState === GameState.AwaitingThirdRollOrScoreSelection
                  ) {
                    setDice(selectAllDice(newDice));
                  }

                  let newScorecard: IScorecard =
                    gameState === GameState.NewGamePending
                      ? resetScorecardWithNewDice(newDice)
                      : updateScorecardForLatestRoll(newDice, scorecard!);

                  if (gameState === GameState.RoundIsOver) {
                    setUserHasSelectedPoints(false);
                  } // prevent clicking points during roll animation

                  if (gameState === GameState.NewGamePending) {
                    setTotals(generateInitialTotalsState());
                  }

                  setScorecard(newScorecard!);
                }
              }, 100);
            },
            gameState !== GameState.NewGamePending
              ? 0
              : scorecardAccordionIsOpen
              ? 700
              : 300
          );

          return {};
        }
      ),
    updateDiceStateForDieClicked: (indexOfClickedDie) =>
      set(({ dice, setters }) => {
        const { setDice } = setters;
        let newDice: IDie[] = [...dice!];
        newDice[indexOfClickedDie].isSelected =
          !newDice[indexOfClickedDie].isSelected;
        setDice(newDice);
        return {};
      }),
    updateGameStateForPointsClicked: (indexOfClickedRow) =>
      set(({ user, roundCounter, dice, scorecard, actions, setters }) => {
        const { updateTotals } = actions;
        const {
          setDice,
          setScorecard,
          setUserHasSelectedPoints,
          setRollButtonText,
        } = setters;

        let newScorecard: IScorecard = { ...scorecard! };

        newScorecard.rows[indexOfClickedRow].earnedPoints =
          newScorecard.rows[indexOfClickedRow].potentialPoints;

        // clear yachtsea bonus options
        newScorecard.yachtseaBonus.yachtseaBonusOptions =
          generateInitialYachtseaBonusOptionState();

        let newDice: IDie[] = selectAllDice(dice!);

        setDice(newDice);
        setScorecard(newScorecard);
        updateTotals(newScorecard);
        setUserHasSelectedPoints(true);

        if (roundCounter === 13) {
          setRollButtonText('New Game');
          if (user?.email) {
            const { grandTotal } = calculateTotalsWithScorecard(newScorecard);
            endGame(user.email, grandTotal);
          }
        }

        return {};
      }),
    updateTotals: (scorecard) =>
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
        const nextRound = (roundCounter + 1) % 13;
        setRoundCounter(nextRound);
        return {};
      }),
    updateUser: (session) =>
      set(({ setters }) => {
        const { setUser } = setters;
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        return {};
      }),
    updateRulesDrawerIsOpen: () =>
      set(({ rulesDrawerIsOpen, setters }) => {
        const { setRulesDrawerIsOpen } = setters;
        rulesDrawerIsOpen
          ? setRulesDrawerIsOpen(false)
          : setRulesDrawerIsOpen(true);
        return {};
      }),
  },

  setters: {
    setRollCounter: (nextRoll) => set({ rollCounter: nextRoll }),
    setRoundCounter: (nextRound) => set({ roundCounter: nextRound }),
    setDiceAreRolling: (bool) => set({ diceAreRolling: bool }),
    setScorecardAccordionIsOpen: (bool) =>
      set({ scorecardAccordionIsOpen: bool }),
    setRulesDrawerIsOpen: (bool) => set({ rulesDrawerIsOpen: bool }),
    setRollButtonText: (newText) => set({ rollButtonText: newText }),
    setDice: (newDice) => set({ dice: newDice }),
    setScorecard: (newScorecard) => set({ scorecard: newScorecard }),
    setTotals: (newTotals) => set({ totals: newTotals }),
    setUserHasSelectedPoints: (bool) => set({ userHasSelectedPoints: bool }),
    setUser: (newUser) => set({ user: newUser }),
  },
}));

export default useGameStore;

export const useGameActions = () => useGameStore((state) => state.actions);

// HELPER FUNCTIONS
function rollAndResetAllDice(): IDie[] {
  const dice = [1, 2, 3, 4, 5];
  return dice.map((dieNumber) => ({
    id: `die-${dieNumber}`,
    value: rollSixSidedDie(),
    isSelected: false,
  }));
}

function rollUnselectedDice(dice: IGameStore['dice']): IDie[] {
  return dice!.map((die) => ({
    id: die.id,
    value: die.isSelected ? die.value : rollSixSidedDie(),
    isSelected: die.isSelected,
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

function resetScorecardWithNewDice(newDice: IDie[]): IScorecard {
  const scorecard = generateInitialScorecardState();
  return {
    rows: scorecard.rows.map(
      (row: IScorecardRow): IScorecardRow => ({
        id: row.id,
        earnedPoints: undefined,
        potentialPoints: row.potentialPointsFunction(newDice),
        potentialPointsFunction: row.potentialPointsFunction,
      })
    ),
    yachtseaBonus: {
      numberOfBonuses: 0,
      yachtseaBonusOptions: generateInitialYachtseaBonusOptionState(),
    },
  };
}

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
    const earnedPoints = scorecard?.rows[idx].earnedPoints ?? -1;
    if (earnedPoints >= 0) {
      return acc + earnedPoints;
    } else return acc;
  }, 0);
  const upperSectionBonus = upperSectionSubtotal >= 63 ? 35 : 0;
  const upperSectionTotal = upperSectionSubtotal + upperSectionBonus;
  return [upperSectionSubtotal, upperSectionBonus, upperSectionTotal];
}

function calculateLowerSectionTotalsWithScorecard(scorecard: IScorecard) {
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

function rollSixSidedDie(): number {
  return Math.ceil(Math.random() * 6);
}
