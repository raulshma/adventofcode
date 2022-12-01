import { resolve, join } from 'path';
import { readdir } from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

const directoryPath = process.env.DIRECTORY!;

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
    const [year, problemNumber, part] = file.split('/').slice(1);

    const cleanedPart = part.substring(0, part.lastIndexOf('.'));

    const inputFilePath = join(
      resolve(),
      directoryPath,
      year,
      problemNumber,
      `input-${cleanedPart}.txt`
    );

    console.log(`YEAR: ${year}, No: ${problemNumber}, Part: ${cleanedPart}`);
    console.log(`Input file: ${inputFilePath}`);
    console.log(`\nOUTPUT:\n`);

    const output = await dynamicallyLoadedEsmModule.default(inputFilePath);
    console.log(output);

    console.log('\nOUTPUT ENDS \n');
  }
}
