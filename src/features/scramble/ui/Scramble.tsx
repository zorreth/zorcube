'use client';

import classes from './Scramble.module.scss';
import { generateScramble } from '../lib/generateScramble';
import { useEffect, useState } from 'react';

export function Scramble() {
  const [scramble, setScramble] = useState(() => generateScramble());

  useEffect(() => {
    const regenerate = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.code === 'KeyR') setScramble(generateScramble());
    };

    const regenerateOnStop = () => setScramble(generateScramble());

    document.addEventListener('keydown', regenerate);
    document.addEventListener('timer-stop', regenerateOnStop);
    
    return () => {
      document.removeEventListener('keydown', regenerate);
      document.removeEventListener('timer-stop', regenerateOnStop);
    };
  }, []);

  return (
    <span suppressHydrationWarning className={classes.scramble}>
      {scramble}
    </span>
  );
}
