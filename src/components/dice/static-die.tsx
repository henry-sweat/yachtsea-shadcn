import { Dot } from './die';

export default function StaticDie() {
  const dotCoordinates = [
    { x: '12', y: '11' },
    { x: '12', y: '25' },
    { x: '12', y: '39' },
    { x: '38', y: '11' },
    { x: '38', y: '25' },
    { x: '38', y: '39' },
  ];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 50 50'
      className='w-12 h-12 border-2 border-primary rounded-xl shadow-md'
      fill='none'
    >
      {dotCoordinates.map((coord) => (
        <Dot key={`static-die-${coord.x}-${coord.y}`} x={coord.x} y={coord.y} />
      ))}
    </svg>
  );
}
