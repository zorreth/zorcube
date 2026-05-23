import classes from './page.module.css';
import Scramble from '@/features/scramble/Scramble';
import Timer from '@/features/timer/Timer';

export default function Home() {
  return (
    <div className={classes.wrapper}>
      <Scramble />
      <Timer />
    </div>
  );
}
