import { useState } from 'react';
import classes from './Timer.module.css';

type Timer = {
  seconds: number;
  minutes: number;
  ms: number;
};

export function Timer() {
  const [timer, setTimer] = useState<Timer>({
    seconds: 0,
    minutes: 0,
    ms: 0,
  });

  const seconds = String(timer.seconds).padStart(2, '0');
  const minutes = String(timer.minutes).padStart(2, '0');
  const ms = String(timer.ms).padStart(3, '0');

  return (
    <div className={classes.wrapper}>
      <span className={classes.time}>{seconds}:{minutes}.{ms}</span>
      <span>Hold any key to start</span>
    </div>
  );
}
