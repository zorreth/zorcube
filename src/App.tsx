import classes from './App.module.css';
import { Scramble } from '@/features/scramble';
import { Timer } from '@/features/timer';

export default function Home() {
  return (
    <div className={classes.wrapper}>
      <Scramble />
      <Timer />
    </div>
  );
}
