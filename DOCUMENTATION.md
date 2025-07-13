# Yachtsea Game Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Design Patterns](#design-patterns)
4. [Component Structure](#component-structure)
5. [State Management](#state-management)
6. [Game Flow](#game-flow)
7. [Scoring System](#scoring-system)
8. [Technical Implementation](#technical-implementation)
9. [Authentication](#authentication)
10. [Database Integration](#database-integration)

## Overview

Yachtsea is a dice game similar to Yahtzee, built as a modern web application using Next.js, React, TypeScript, and Tailwind CSS. The game allows players to roll dice, select combinations, and score points across multiple rounds. The application features a responsive design, user authentication, and persistent game statistics.

### Key Features

- Interactive dice rolling and selection
- Comprehensive scoring system with upper and lower sections
- User authentication via Google
- Game state persistence
- Statistics tracking
- Responsive design for mobile and desktop
- Undo functionality for moves
- Detailed game rules

## Architecture

Yachtsea is built on a modern web stack with the following key technologies:

- **Framework**: Next.js (React framework with server-side rendering capabilities)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: Zustand
- **Authentication**: NextAuth.js with Google provider
- **Animation**: Framer Motion

The application follows a client-side architecture with server components for authentication and data persistence. It uses Next.js App Router for routing and layout management.

### Project Structure

```
yachtsea-shadcn/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   ├── components/         # React components
│   │   ├── dice/           # Dice-related components
│   │   ├── roll-button/    # Roll button component
│   │   ├── scorecard/      # Scorecard components
│   │   ├── ui/             # UI components from Shadcn
│   │   └── user-buttons/   # User authentication components
│   ├── db/                 # Database interactions
│   ├── lib/                # Utility functions and constants
│   ├── server/             # Server-side actions
│   ├── state/              # State management
│   └── types/              # TypeScript type definitions
```

## Design Patterns

Yachtsea implements several design patterns to manage complexity and maintain a clean architecture:

### 1. Command Pattern

The game uses the Command pattern to encapsulate actions as objects. This allows for features like undo functionality and action history.

```typescript
// Commands in src/state/commands.ts
export class RollDiceCommand implements ICommand {
  constructor(private store: IGameStore) {}

  execute() {
    this.store.currentGameState.rollDice(this.store);
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
```

### 2. State Pattern

The game uses the State pattern to manage different game states and their associated behaviors. Each state implements a common interface but handles actions differently based on the current game context.

```typescript
// Game states in src/state/commands.ts
export class InitialGameState implements IGameState {
  async rollDice(store: IGameStore) {
    // Implementation for initial state
  }

  selectDie() {
    console.log("cant select dice in current state");
  }

  // Other methods...
}

class AwaitingSecondRollOrScoreSelectionState implements IGameState {
  async rollDice(store: IGameStore) {
    // Different implementation for this state
  }

  selectDie(store: IGameStore, indexOfClickedDie: number) {
    store.selectDie(indexOfClickedDie);
  }

  // Other methods...
}
```

### 3. Memento Pattern

The game uses the Memento pattern to capture and restore game state snapshots, enabling the undo functionality.

```typescript
// Memento in src/state/commands.ts
export class Memento {
  private undoableGameState;

  constructor(undoableGameState: IUndoableGameState) {
    this.undoableGameState = undoableGameState;
  }

  getState(): IUndoableGameState {
    return this.undoableGameState;
  }
}
```

### 4. Observer Pattern (via Zustand)

The application uses Zustand, which implements a form of the Observer pattern, allowing components to subscribe to state changes.

## Component Structure

The application is organized into several key component groups:

### Game Component

The main game component (`src/components/game.tsx`) serves as the container for the game UI and orchestrates the interaction between different parts of the game.

### Dice Components

- `dice-container.tsx`: Container for all dice
- `die.tsx`: Individual die component with SVG rendering

### Scorecard Components

- `scorecard.tsx`: Main scorecard component
- `scorecard-table.tsx`: Table layout for the scorecard
- `scorecard-rows.tsx`: Row components for the scorecard

### UI Components

The application uses Shadcn UI components for consistent styling and behavior:

- Accordion
- Button
- Card
- Drawer
- Table
- Toast
- and more

### User Interface Flow

1. The game starts with the main screen showing the scorecard and dice
2. Players can roll dice up to three times per round
3. Between rolls, players can select dice to keep
4. After rolling, players select a scoring category
5. The game proceeds through 13 rounds
6. Final score is displayed and saved to the database

## State Management

Yachtsea uses Zustand for state management, providing a simple and efficient way to handle the game's complex state.

### Game Store

The main store (`src/state/index.ts`) contains:

- Game state (current phase, dice values, scorecard, etc.)
- Action handlers (roll dice, select die, select scorecard row, etc.)
- Helper functions (dice animation, scorecard updates, etc.)
- Setters for updating state

```typescript
const useGameStore = create<IGameStore>((set, get) => ({
  user: undefined,
  currentGameState: new InitialGameState(),
  dice: generateInitialDiceValuesState(),
  scorecard: generateInitialScorecardState(),
  totals: generateInitialTotalsState(),
  rollCounter: 0,
  roundCounter: 0,
  // More state properties...

  // Actions
  handleRollButtonClicked: () => {
    const command = new RollDiceCommand(get());
    command.execute();
  },
  // More actions...

  // Helpers
  triggerDiceAnimation: () => {
    // Implementation...
  },
  // More helpers...

  // Setters
  setDice: (newDice) => set({ dice: newDice }),
  // More setters...
}));
```

### State Transitions

The game progresses through several states:

1. `InitialGameState`: Starting state
2. `AwaitingSecondRollOrScoreSelectionState`: After first roll
3. `AwaitingThirdRollOrScoreSelectionState`: After second roll
4. `AwaitingScoreSelectionState`: After third roll
5. `RoundIsOverState`: After scoring
6. `GameIsOverState`: After all rounds are complete

Each state determines what actions are allowed and how they affect the game.

## Game Flow

### Game Initialization

1. The game starts in the `InitialGameState`
2. Initial dice, scorecard, and totals are generated
3. The scorecard accordion is opened

### Round Flow

1. Player rolls dice (up to 3 times per round)
2. Between rolls, player can select dice to keep
3. Player selects a scoring category
4. Scores are updated
5. Game advances to the next round

### Game Completion

1. After 13 rounds, the game enters `GameIsOverState`
2. Final score is calculated and displayed
3. Score is saved to the database
4. Player can start a new game

## Scoring System

The scorecard is divided into an Upper Section and a Lower Section:

### Upper Section

| Category | Scoring                         |
| -------- | ------------------------------- |
| Ones     | Sum of all 1's                  |
| Twos     | Sum of all 2's                  |
| Threes   | Sum of all 3's                  |
| Fours    | Sum of all 4's                  |
| Fives    | Sum of all 5's                  |
| Sixes    | Sum of all 6's                  |
| Bonus    | 35 points if upper section ≥ 63 |

### Lower Section

| Category   | Scoring                                   |
| ---------- | ----------------------------------------- |
| Set of 3   | Sum of all dice if 3+ of a kind           |
| Set of 4   | Sum of all dice if 4+ of a kind           |
| Full House | 25 points (3 of one number, 2 of another) |
| Sm. Str.   | 30 points (4 consecutive numbers)         |
| Lg. Str.   | 40 points (5 consecutive numbers)         |
| Yachtsea   | 50 points (5 of a kind)                   |
| Chance     | Sum of all dice                           |

### Special Scoring Rules

- **Yachtsea Bonus**: Additional Yachtseas after scoring the first one in the Yachtsea box earn a 100-point bonus each
- **Joker Rules**: Special rules apply when rolling a Yachtsea after the Yachtsea box has been filled

## Technical Implementation

### Dice Implementation

Dice are rendered as SVG components with dots positioned according to the die value:

```typescript
// Dot coordinates for each die value
const dotCoordinates: IDotCoordinates = new Map([
  [1, [{ x: "25", y: "25" }]],
  [
    2,
    [
      { x: "12", y: "12" },
      { x: "38", y: "38" },
    ],
  ],
  // More values...
]);
```

### Animation

The application uses Framer Motion for animations:

- Dice shaking during rolls
- Dice movement when selected/deselected
- Hover and tap animations

### Responsive Design

The game adapts to different screen sizes and orientations:

- Portrait mode for optimal gameplay
- Orientation warning for landscape mode
- Responsive sizing of game elements

## Authentication

Yachtsea uses NextAuth.js for authentication with Google as the provider:

```typescript
// Server actions for authentication
export async function signInServerAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutServerAction() {
  await signOut({ redirectTo: "/" });
}
```

## Database Integration

The game integrates with a database to store:

- Game starts and completions
- User scores
- Statistics

```typescript
// Database actions
export async function startGame(userEmail: string) {
  // Implementation to record game start
}

export async function endGame(userEmail: string, score: number) {
  // Implementation to record game end and score
}
```

---

This documentation provides a comprehensive overview of the Yachtsea game application, covering its architecture, design patterns, component structure, state management, game flow, and technical implementation details. It serves as a reference for understanding how the game works and how its various components interact.
