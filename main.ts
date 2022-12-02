import { resolve, join } from 'path';
import { readdir } from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

let specificProblemYear = '';
let specificProblem = '';

if (process.argv.length > 2) {
  specificProblemYear = process.argv.at(2)!;
  specificProblem = process.argv.at(3)!;
  console.error(
    `Specific problem folder specified: ${specificProblemYear} ${specificProblem}`
  );
}
const mainDirectory = process.env.DIRECTORY!;
const directoryPath = join(mainDirectory, specificProblemYear, specificProblem);

console.log(`Directory for scripts: ${directoryPath}`);

const getFileList = async (dirName: string) => {
  let files: string[] = [];
  const items = await readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else if (/[.](js|ts)$/.test(item.name)) {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

const result = await getFileList(directoryPath);

const dynamicImport = new Function('specifier', 'return import(specifier)');

for (let file of result) {
  const dynamicallyLoadedEsmModule = await dynamicImport('./' + file);
  if (Object.hasOwn(dynamicallyLoadedEsmModule, 'default')) {
    console.log(file);
    const [year, problemNumber, part] = file
      .replaceAll('\\', '/')
      .split('/')
      .slice(1);

    const cleanedPart = part.substring(0, part.lastIndexOf('.'));

    const inputFilePath = join(
      resolve(),
      mainDirectory,
      year,
      problemNumber,
      `input.txt`
    );
    console.log(`YEAR: ${year}, No: ${problemNumber}, Part: ${cleanedPart}`);
    console.log(`Input file: ${inputFilePath}`);

    console.log(`\nOUTPUT STARTS:\n`);

    console.time('Execution time');

    const output = await dynamicallyLoadedEsmModule.default(inputFilePath);
    console.log(output);

    console.log();

    console.timeEnd('Execution time');

    console.log(`OUTPUT ENDS:\n`);
  }
}
