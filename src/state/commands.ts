import { ICommand, IGameState, IGameStore } from '@/types';

// GameStates
export class InitialGameState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollButtonText('Roll');
    store.setRollCounter(1);
    store.setRoundCounter(1);
    await store.openScorecardAccordion();
    await store.triggerDiceAnimation();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingSecondRollOrScoreSelectionState());
  }
  selectDie() {
    console.log('cant select dice in current state');
  }
  selectScorecardRow() {
    console.log('cant select scorecard row in current state...');
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

class AwaitingSecondRollOrScoreSelectionState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollCounter(2);
    await store.triggerDiceAnimation();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingThirdRollOrScoreSelectionState());
  }

  selectDie(store: IGameStore, indexOfClickedDie: number) {
    store.selectDie(indexOfClickedDie);
  }

  selectScorecardRow(store: IGameStore, indexOfClickedRow: number) {
    store.updateScorecardForScorecardRowSelection(indexOfClickedRow);
    store.updateTotals();
    store.selectAllDice();
    if (store.roundCounter === 13) {
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

class AwaitingThirdRollOrScoreSelectionState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollCounter(3);
    await store.triggerDiceAnimation();
    store.selectAllDice();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingScoreSelectionState());
  }

  selectDie(store: IGameStore, indexOfClickedDie: number) {
    store.selectDie(indexOfClickedDie);
  }

  selectScorecardRow(store: IGameStore, indexOfClickedRow: number) {
    store.updateScorecardForScorecardRowSelection(indexOfClickedRow);
    store.updateTotals();
    store.selectAllDice();
    if (store.roundCounter === 13) {
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

class AwaitingScoreSelectionState implements IGameState {
  rollDice() {
    console.log('cant roll the dice during score selection...');
  }
  selectDie() {
    console.log('cant select dice in current state');
  }
  selectScorecardRow(store: IGameStore, indexOfClickedRow: number) {
    store.updateScorecardForScorecardRowSelection(indexOfClickedRow);
    store.updateTotals();
    if (store.roundCounter === 13) {
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

class RoundIsOverState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollCounter(1);
    store.setRoundCounter(store.roundCounter + 1);
    store.unselectAllDice();
    await store.triggerDiceAnimation();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingSecondRollOrScoreSelectionState());
  }
  selectDie() {
    console.log('cant select dice in current state');
  }
  selectScorecardRow() {
    console.log('cant select scorecard row in current state...');
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

class GameIsOverState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollButtonText('Roll');
    store.setRollCounter(1);
    store.setRoundCounter(1);
    await store.closeScorecardAccordion();
    store.unselectAllDice();
    store.resetScorecard();
    store.updateTotals();
    await store.openScorecardAccordion();
    await store.triggerDiceAnimation();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingSecondRollOrScoreSelectionState());
  }
  selectDie() {
    console.log('cant select dice in current state');
  }
  selectScorecardRow() {
    console.log('cant select scorecard row in current state...');
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
}

// Commands
export class RollDiceCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.rollDice(this.store);
  }
}

export class SelectDieCommand implements ICommand {
  constructor(private store: IGameStore, private indexOfClickedDie: number) {}

  execute() {
    this.store.currentGameState.selectDie(this.store, this.indexOfClickedDie);
  }
}

export class SelectScorecardRowCommand implements ICommand {
  constructor(private store: IGameStore, private indexOfClickedRow: number) {}

  execute() {
    this.store.currentGameState.selectScorecardRow(
      this.store,
      this.indexOfClickedRow
    );
  }
}

export class OpenRulesDrawerCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.openRulesDrawer(this.store);
  }
}
