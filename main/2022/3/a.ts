import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  const lines = inputString.split('\n');
  if (lines.at(-1) === '') lines.pop();

  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const middle = lines[i].length / 2;
    const firstHalf = lines[i].slice(0, middle);
    const secondHalf = lines[i].slice(middle);
    const [intersection] = firstHalf
      .split('')
      .filter((item) => secondHalf.includes(item));
    if (intersection === intersection.toUpperCase())
      total += intersection.charCodeAt(0) - 38;
    else total += intersection.charCodeAt(0) - 96;
  }

  return total;
}
