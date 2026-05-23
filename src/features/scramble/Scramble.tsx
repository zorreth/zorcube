'use client';

import classes from './Scramble.module.css';

const scramble = `F2 U' L' U2 L' R2 B' U B' L B' R2 D L' D B' F' L2 U' R'`;

export default function Scramble() {
  return (
    <div className={classes.wrapper}>
      <span className={classes.scramble}>{scramble}</span>
      <span className={classes.regenerate}>press R to regenerate scramble</span>
    </div>
  );
}
