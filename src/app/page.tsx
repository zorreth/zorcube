import classes from './page.module.scss';
import { Scramble } from '@/features/scramble';
import { Timer } from '@/features/timer';
import { UserNav } from '@/shared/ui/UserNav';

export default function Home() {
  return (
    <div>
      <nav className={classes.nav}>
        <UserNav />
      </nav>

      <main className={classes.main}>
        <Scramble />
        <Timer />
      </main>
    </div>
  );
}
