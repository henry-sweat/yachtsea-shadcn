import { auth } from 'auth';
import { getStats } from '@/db/actions';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  if (!session) {
    return renderNotSignedInMessage();
  }

  const user_id = session?.user?.email;
  if (!user_id) {
    return renderNotSignedInMessage();
  }
  const data = await getStats(user_id);

  return renderStatsPage(data);
}

function renderNotSignedInMessage() {
  return <p>You are not signed in!</p>;
}

interface IStatsProps {
  highScore: number;
  totalGamesStarted: number;
  totalGamesFinished: number;
  averageScore: number;
}

function renderStatsPage({
  highScore,
  totalGamesStarted,
  totalGamesFinished,
  averageScore,
}: IStatsProps) {
  return (
    <main className='flex flex-col scroll-my-12 overflow-auto px-6 py-16 md:mb-12 md:px-16 md:py-4'>
      <div>{`High Score: ${highScore}`}</div>
      <div>{`Average Score: ${averageScore}`}</div>
      <div>{`Total Games Started: ${totalGamesStarted}`}</div>
      <div>{`Total Games Finished: ${totalGamesFinished}`}</div>
    </main>
  );
}
