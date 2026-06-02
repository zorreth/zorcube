'use client';

import clsx from 'clsx';
import classes from './Timer.module.scss';
import { useEffect, useRef, useState } from 'react';

type TimerState = 'idle' | 'ready' | 'running';

export function Timer() {
  const [time, setTime] = useState('00:00.000');
  const [timerState, setTimerState] = useState<TimerState>('idle');

  const prepareDateRef = useRef<Date | null>(null);
  const timerDateRef = useRef<Date | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prepare = () => {
      prepareDateRef.current = new Date();
      setTimerState('ready');
    };

    const start = () => {
      if (!prepareDateRef.current) return;

      if (Date.now() - prepareDateRef.current.getTime() > 1000) {
        timerDateRef.current = new Date();
        setTimerState('running');

        timerInterval.current = setInterval(() => {
          const elapsed = Date.now() - timerDateRef.current!.getTime();
          const minutes = Math.floor(elapsed / 60000);
          const seconds = Math.floor((elapsed % 60000) / 1000);
          const ms = elapsed % 1000;
          setTime(
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`,
          );
        }, 10);
      } else {
        setTimerState('idle');
      }
    };

    const stop = () => {
      if (!timerInterval.current) return;

      clearInterval(timerInterval.current);
      setTimerState('idle');
      document.dispatchEvent(new CustomEvent('timer-stop'));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (timerState === 'running') {
        stop();
      } else if (e.code === 'Space' && !e.repeat) {
        prepare();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (timerState !== 'ready') return;
      if (e.code === 'Space') start();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('touchstart', prepare);
    document.addEventListener('touchend', start);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('touchstart', prepare);
      document.removeEventListener('touchend', start);
    };
  }, [timerState]);

  return <span className={clsx(classes.timer, classes[timerState])}>{time}</span>;
}
