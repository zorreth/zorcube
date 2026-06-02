import classes from './page.module.scss';
import { Scramble } from '@/features/scramble';
import { Timer } from '@/features/timer';

export default function Home() {
  return (
    <main className={classes.main}>
      <Scramble />
      <Timer />
    </main>
  );
}
