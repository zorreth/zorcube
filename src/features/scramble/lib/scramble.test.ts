import { expect, test } from 'vitest';
import { generateScramble } from './scramble';

test('generates correct length', () => {
  const scramble = generateScramble(20);

  expect(scramble.split(' ')).toHaveLength(20);
});

test('does not repeat the same side sequentially', () => {
  for (let i = 0; i < 100; i++) {
    const moves = generateScramble(50).split(' ');

    for (let j = 1; j < moves.length; j++) {
      const prevSide = moves[j - 1][0];
      const currentSide = moves[j][0];

      expect(currentSide).not.toBe(prevSide);
    }
  }
});

test('all moves are valid', () => {
  const sides = ['L', 'R', 'D', 'U', 'B', 'F'];
  const validMoves = new Set([
    ...sides,
    ...sides.map((s) => s + "'"),
    ...sides.map((s) => s + '2'),
  ]);

  const moves = generateScramble(100).split(' ');

  for (const move of moves) {
    expect(move).toBeOneOf(validMoves);
  }
});
