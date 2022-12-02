import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  let score = 0;

  const totalGames = inputString.split('\n');
  if (totalGames.at(-1) === '') totalGames.pop();

  const scoreMap: { [id: string]: number } = {
    'A X': 4,
    'B X': 1,
    'C X': 7,
    'A Y': 8,
    'B Y': 5,
    'C Y': 2,
    'A Z': 3,
    'B Z': 9,
    'C Z': 6,
  };
  for (let i = 0; i < totalGames.length; i++) {
    score += scoreMap[totalGames.at(i)!];
  }

  return score;
}
