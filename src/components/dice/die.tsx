import useGameStateStore from '@/stores/gameState';

interface IDieProps {
  diceStateIndex: number;
}

interface IDotContainerProps {
  children: React.ReactNode;
}

interface IDotProps {
  x: string;
  y: string;
}

type IDotCoordinates = Map<number, IDotProps[]>;

const dotCoordinates: IDotCoordinates = new Map([
  [1, [{ x: '25', y: '25' }]],
  [
    2,
    [
      { x: '12', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    3,
    [
      { x: '12', y: '12' },
      { x: '25', y: '25' },
      { x: '38', y: '38' },
    ],
  ],
  [
    4,
    [
      { x: '12', y: '12' },
      { x: '12', y: '38' },
      { x: '38', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    5,
    [
      { x: '12', y: '12' },
      { x: '12', y: '38' },
      { x: '25', y: '25' },
      { x: '38', y: '12' },
      { x: '38', y: '38' },
    ],
  ],
  [
    6,
    [
      { x: '12', y: '12' },
      { x: '12', y: '25' },
      { x: '12', y: '38' },
      { x: '38', y: '12' },
      { x: '38', y: '25' },
      { x: '38', y: '38' },
    ],
  ],
]);

export default function Die({ diceStateIndex }: IDieProps) {
  const dice = useGameStateStore((state) => state.dice);

  const value = dice[diceStateIndex].value;

  return (
    <DotContainer>
      {(dotCoordinates.get(value) || []).map((dot) => (
        <Dot x={dot.x} y={dot.y} key={`key-${dot.x}-${dot.y}`} />
      ))}
    </DotContainer>
  );
}

function DotContainer({ children }: IDotContainerProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 50 50'
      className='w-full h-full'
      fill='none'
    >
      {children}
    </svg>
  );
}

function Dot({ x, y }: IDotProps) {
  return <circle r='5' cx={x} cy={y} className='fill-primary' />;
}
