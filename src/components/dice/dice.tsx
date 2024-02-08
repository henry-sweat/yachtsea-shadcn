interface IDieProps {
  value: number;
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
      { x: '10', y: '10' },
      { x: '40', y: '40' },
    ],
  ],
  [
    3,
    [
      { x: '10', y: '10' },
      { x: '25', y: '25' },
      { x: '40', y: '40' },
    ],
  ],
  [
    4,
    [
      { x: '10', y: '10' },
      { x: '10', y: '40' },
      { x: '40', y: '10' },
      { x: '40', y: '40' },
    ],
  ],
  [
    5,
    [
      { x: '10', y: '10' },
      { x: '10', y: '40' },
      { x: '25', y: '25' },
      { x: '40', y: '10' },
      { x: '40', y: '40' },
    ],
  ],
  [
    6,
    [
      { x: '10', y: '10' },
      { x: '10', y: '25' },
      { x: '10', y: '40' },
      { x: '40', y: '10' },
      { x: '40', y: '25' },
      { x: '40', y: '40' },
    ],
  ],
]);

export default function Die({ value }: IDieProps) {
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
    <svg height='50' width='50' xmlns='http://www.w3.org/2000/svg'>
      {children}
    </svg>
  );
}

function Dot({ x, y }: IDotProps) {
  return <circle r='6' cx={x} cy={y} fill='black' />;
}
