import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  const assignments = inputString.split('\n');
  if (assignments.at(-1) === '') assignments.pop();

  let fullyContainedCount = 0;

  for (let i = 0; i < assignments.length; i++) {
    const [assignmentOne, assignmentTwo] = assignments[i].split(',');
    const [aMin, aMax] = assignmentOne.split('-').map((val) => parseInt(val));
    const [bMin, bMax] = assignmentTwo.split('-').map((val) => parseInt(val));
    if ((aMin <= bMin && aMax >= bMax) || (aMin >= bMin && aMax <= bMax))
      fullyContainedCount += 1;
  }

  return fullyContainedCount;
}
