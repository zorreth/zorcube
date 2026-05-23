'use client';

import { useEffect, useRef, useState } from 'react';
import classes from './Timer.module.css';

export default function Timer() {
  const [time, setTime] = useState('00:00:00');

  const isHolding = useRef(false);
  const isReady = useRef(false);
  const isRunning = useRef(false);

  useEffect(() => {
    const startTimer = () => {
      isRunning.current = true;
      console.log('Timer started!');
    };

    const stopTimer = () => {
      isRunning.current = false;
      console.log('Timer stopped!');
    };

    const onKeyDown = () => {
      if (isHolding.current) return;

      isHolding.current = true;
      isReady.current = false;

      setTimeout(() => {
        if (isHolding) isReady.current = true;
      }, 2000);
    };

    const onKeyUp = () => {
      isHolding.current = false;

      if (isReady.current) {
        if (isRunning.current) {
          startTimer();
        } else {
          stopTimer();
        }
      }

      isReady.current = false;
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <span className={classes.time}>{time}</span>
      <span>Hold any key to start</span>
    </div>
  );
}
