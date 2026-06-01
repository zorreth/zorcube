import classes from './page.module.scss';
import { Scramble } from '@/features/scramble';

export default function Home() {
  return (
    <main className={classes.main}>
      <Scramble />
    </main>
  );
}
