import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  const calories = inputString.split('\n');

  let highestCalories = [0, 0, 0];

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

    for (let c = 0; c < highestCalories.length - 1; c++) {
      if (currentCalories > highestCalories[c]) {
        if (c < highestCalories.length - 1)
          highestCalories[c + 1] = highestCalories[c];
        highestCalories[c] = currentCalories;
        break;
      }
    }
  }

  let sum = 0;
  highestCalories.forEach((e) => (sum += e));
  return sum;
}
