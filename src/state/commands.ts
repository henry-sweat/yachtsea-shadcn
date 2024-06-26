import { ICommand, IGameState, IGameStore } from '@/types';

// GameStates
export class InitialGameState implements IGameState {
  async rollDice(store: IGameStore) {
    store.startGameInDatabase();
    store.toggleRollButtonPulse();
    store.setRollCounter(1);
    store.setRoundCounter(1);
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
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  restartGame() {
    console.log('cant restart game in current state');
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
      store.endGameInDatabase();
      store.toggleRollButtonPulse();
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  async restartGame(store: IGameStore) {
    store.startGameInDatabase();
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
      store.endGameInDatabase();
      store.toggleRollButtonPulse();
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  async restartGame(store: IGameStore) {
    store.startGameInDatabase();
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
      store.endGameInDatabase();
      store.toggleRollButtonPulse();
      store.setRollButtonText('New Game');
      store.setCurrentGameState(new GameIsOverState());
    } else {
      store.setCurrentGameState(new RoundIsOverState());
    }
  }
  openRulesDrawer(store: IGameStore) {
    store.openRulesDrawer();
  }
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  async restartGame(store: IGameStore) {
    store.startGameInDatabase();
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
}

class RoundIsOverState implements IGameState {
  async rollDice(store: IGameStore) {
    store.setRollCounter(1);
    store.setRoundCounter(store.roundCounter + 1);
    store.removeCommandFromHistory();
    await store.unselectAllDiceAsync();
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
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  async restartGame(store: IGameStore) {
    store.startGameInDatabase();
    store.setRollCounter(1);
    store.setRoundCounter(1);
    store.removeCommandFromHistory();
    await store.closeScorecardAccordion();
    store.unselectAllDice();
    store.resetScorecard();
    store.updateTotals();
    await store.openScorecardAccordion();
    await store.triggerDiceAnimation();
    store.updateScorecardForDiceRoll();
    store.setCurrentGameState(new AwaitingSecondRollOrScoreSelectionState());
  }
}

class GameIsOverState implements IGameState {
  async rollDice(store: IGameStore) {
    store.startGameInDatabase();
    store.setRollButtonText('Roll');
    store.toggleRollButtonPulse();
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
  closeRulesDrawer(store: IGameStore) {
    store.closeRulesDrawer();
  }
  async restartGame(store: IGameStore) {
    store.startGameInDatabase();
    store.setRollButtonText('Roll');
    store.toggleRollButtonPulse();
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
}

// Memento
export class Memento {
  private undoableGameState;

  constructor(undoableGameState: IUndoableGameState) {
    this.undoableGameState = undoableGameState;
  }

  getState(): IUndoableGameState {
    return this.undoableGameState;
  }
}

interface IUndoableGameState {
  currentGameState: IGameStore['currentGameState'];
  dice: IGameStore['dice'];
  scorecard: IGameStore['scorecard'];
  totals: IGameStore['totals'];
  mostRecentScorecardRowSelectionCommand: IGameStore['mostRecentScorecardRowSelectionCommand'];
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
  private snapshot?: Memento;

  constructor(private store: IGameStore, private indexOfClickedRow: number) {}

  execute() {
    if (this.store.roundCounter < 13) {
      this.snapshot = this.store.createSnapshot();
      this.store.addCommandToHistory(this);
    }
    this.store.currentGameState.selectScorecardRow(
      this.store,
      this.indexOfClickedRow
    );
  }
  undo() {
    if (this.snapshot) {
      this.store.restoreStateFromSnapshot(this.snapshot);
    }
  }
}

export class OpenRulesDrawerCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.openRulesDrawer(this.store);
  }
}

export class CloseRulesDrawerCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.closeRulesDrawer(this.store);
  }
}

export class RestartGameCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.restartGame(this.store);
  }
}
