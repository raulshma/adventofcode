import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  const calories = inputString.split('\n');

  let highestCalories = 0;

  let lastEmptyIndex = 0;

  for (let i = 0; i < calories.length; i++) {
    let currentCalories = 0;
    for (let j = lastEmptyIndex + 1; j < calories.length; j++) {
      if (calories[j] == '') {
        lastEmptyIndex = j;
        break;
      }
      currentCalories += Number(calories[j]);
    }
    if (currentCalories >= highestCalories) highestCalories = currentCalories;
  }

  return highestCalories;
}
