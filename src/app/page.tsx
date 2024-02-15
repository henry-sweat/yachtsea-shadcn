import Game from '@/components/game';

export default function Home() {
  return (
    <main
      className={`fixed bottom-0 w-full flex flex-col flex-col-reverse items-center mx-auto scroll-my-12 x-hidden pb-4 px-4`}
    >
      <Game />
    </main>
  );
}
