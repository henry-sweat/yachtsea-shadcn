import Game from '@/components/game';

export default function Home() {
  return (
    <main className='flex-1 w-full flex flex-col flex-col-reverse items-center relative mx-auto scroll-my-12 overflow-auto px-4 md:pb-4'>
      <div className='flex flex-col flex-row-reverse'>
        <Game />
      </div>
    </main>
  );
}
