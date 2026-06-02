const FACES = ['L', 'R', 'F', 'B', 'U', 'D'];
const SUFFIXES = ['', '2', "'"];

export function generateScramble(size = 20): string {
  const result: string[] = [];
  let lastFace = '';

  for (let i = 0; i < size; i++) {
    const available = FACES.filter((face) => face !== lastFace);

    const face = available[Math.floor(Math.random() * available.length)];
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];

    result.push(face + suffix);

    lastFace = face;
  }

  return result.join(' ');
}
