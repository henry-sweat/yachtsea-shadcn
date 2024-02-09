import Game from '@/components/game';
import { Section } from '@/components/ui/section';

export default function Home() {
  return (
    <main className='container relative mx-auto scroll-my-12 overflow-auto px-4 py-2 print:p-12 md:mb-12 md:px-16 md:py-4'>
      <section className='mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6'>
        <Section className='items-center'>
          <Game />
        </Section>
      </section>
    </main>
  );
}
