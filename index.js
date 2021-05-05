const argv = require('yargs').argv;
const { readFile, writeFile } = require('fs').promises;
const { json2csvAsync } = require('json-2-csv');

const inputFileName = argv._[0];
const outputFileName = argv._[1];

async function parseJSONFile (fileName) {
  try {
    const file = await readFile(fileName);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function writeCSV (fileName, data) {
  await writeFile(fileName, data, 'utf8');
}

(async () => {
  const data = await parseJSONFile(inputFileName);
  const csv = await json2csvAsync(data);
  await writeCSV(outputFileName, csv);
  console.log(`Successfully converted ${outputFileName}!`);
})();