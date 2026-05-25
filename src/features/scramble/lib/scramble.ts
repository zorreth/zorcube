const sides = ['L', 'R', 'D', 'U', 'B', 'F'];
const suffixes = ['', "'", '2'];

export function generateScramble(length = 20): string {
  const result: string[] = [];
  let previousSide: string | null = null;

  for (let i = 0; i < length; i++) {
    const availableSides = sides.filter((side) => side !== previousSide);

    const side = availableSides[Math.floor(Math.random() * availableSides.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    result.push(side + suffix);
    previousSide = side;
  }

  return result.join(' ');
}
