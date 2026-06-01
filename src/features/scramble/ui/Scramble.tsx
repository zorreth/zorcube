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

    document.addEventListener('keydown', regenerate);
    return () => document.removeEventListener('keydown', regenerate);
  }, []);

  return (
    <span suppressHydrationWarning className={classes.scramble}>
      {scramble}
    </span>
  );
}
