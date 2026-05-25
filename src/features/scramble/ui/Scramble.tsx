'use client';

import classes from './Scramble.module.css';
import { useEffect, useState } from 'react';
import { generateScramble } from '../lib/scramble';

export function Scramble() {
  const [scramble, setScramble] = useState(generateScramble());

  useEffect(() => {
    const regenerate = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.code === 'KeyR') {
        setScramble(generateScramble());
      }
    };

    document.addEventListener('keydown', regenerate);
    return () => document.removeEventListener('keydown', regenerate);
  }, []);

  return (
    <div className={classes.wrapper}>
      <span className={classes.scramble}>{scramble}</span>
      <span className={classes.regenerate}>press R to regenerate scramble</span>
    </div>
  );
}
