import { useEffect, useRef, useState } from 'react';
import classes from './Timer.module.css';
import clsx from 'clsx';

type Timer = {
  minutes: number;
  seconds: number;
  ms: number;
};

type Status = 'idle' | 'ready' | 'running';

export function Timer() {
  const [timer, setTimer] = useState<Timer>({
    minutes: 0,
    seconds: 0,
    ms: 0,
  });

  const [status, setStatus] = useState<Status>('idle');

  const pressedKey = useRef<string | null>(null);
  const pressDate = useRef<Date | null>(null);

  const timerDate = useRef<Date | null>(null);

  useEffect(() => {
    const prepareTimer = () => {
      if (status === 'idle') {
        pressDate.current = new Date();
        setStatus('ready');
      } else if (status === 'running') {
        timerDate.current = null;
        setStatus('idle');
      }
    };

    const startTimer = () => {
      if (!pressDate.current) return;
      if (status !== 'ready') return;

      if (Date.now() - pressDate.current.getTime() > 1000) {
        setStatus('running');

        timerDate.current = new Date();

        const interval = setInterval(() => {
          if (!timerDate.current) {
            clearInterval(interval);
            return;
          }

          const diff = Date.now() - timerDate.current.getTime();

          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          const ms = diff % 1000;

          setTimer({ minutes, seconds, ms });
        }, 10);
      } else {
        setStatus('idle');
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      pressedKey.current = e.code;
      prepareTimer();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!pressedKey.current || !pressDate.current) return;
      if (e.code !== pressedKey.current) return;

      startTimer();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousedown', prepareTimer);
    document.addEventListener('mouseup', startTimer);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousedown', prepareTimer);
      document.removeEventListener('mouseup', startTimer);
    };
  }, [status, timer]);

  const seconds = String(timer.seconds).padStart(2, '0');
  const minutes = String(timer.minutes).padStart(2, '0');
  const ms = String(timer.ms).padStart(3, '0');

  return (
    <div className={classes.wrapper}>
      <span className={clsx(classes.time, classes[status])}>
        {minutes}:{seconds}.{ms}
      </span>

      {status !== 'running' && <span>Hold any key to start</span>}
    </div>
  );
}
