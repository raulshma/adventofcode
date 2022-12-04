import { readFile } from 'fs/promises';

export default async function (inputPath: string) {
  const inputBuffer = await readFile(inputPath);
  const inputString = inputBuffer.toString();

  const lines = inputString.split('\n');
  if (lines.at(-1) === '') lines.pop();

  let total = 0;

  const groups = [];
  for (let i = 0; i < lines.length; i += 3) groups.push(lines.slice(i, i + 3));

  groups?.forEach((group) => {
    const [one, two, three] = group;
    const allItems = new Array(one.split(''), two.split(''), three.split(''));
    const [intersection] = allItems.reduce((p, c) =>
      p.filter((e) => c.includes(e))
    );

    if (intersection === intersection.toUpperCase())
      total += intersection.charCodeAt(0) - 38;
    else total += intersection.charCodeAt(0) - 96;
  });

  return total;
}
