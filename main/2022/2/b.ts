import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  let score = 0;

  const totalGames = inputString.split('\n');
  if (totalGames.at(-1) === '') totalGames.pop();

  const scoreMap: { [id: string]: number[] } = {
    'A X': [4, 3],
    'B X': [1, 1],
    'C X': [7, 2],
    'A Y': [8, 4],
    'B Y': [5, 5],
    'C Y': [2, 6],
    'A Z': [3, 8],
    'B Z': [9, 9],
    'C Z': [6, 7],
  };

  for (let i = 0; i < totalGames.length; i++) {
    const game = totalGames.at(i)!;
    score += scoreMap[game].at(1)!;
  }

  return score;
}
