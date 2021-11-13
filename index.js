const fs = require("fs");
const path = require("path");
const { argv, stderr, exit } = process;
const { errColor } = require("./src/utils");

const getPipeStream = require("./src/streams");

argv.slice(2);

const getFlagValue = flag => {
  const flagInd = argv.indexOf(flag);

  return flagInd !== -1 ? argv[flagInd + 1] : null;
};

let inputPath = getFlagValue("-i");
if (inputPath === null) {
  inputPath = "";
}
inputPath = path.resolve(__dirname, inputPath);

let outputPath = getFlagValue("-o");
if (outputPath === null) {
  outputPath = "";
}

outputPath = path.resolve(__dirname, outputPath);

const config = getFlagValue("-c");

if (inputPath) {
  fs.readFile(inputPath, "utf-8", (error, data) => {
    if (error) {
      stderr.write(errColor(`No such file "${inputPath}"!\n`));
      exit(1);
    }
  });
}

if (outputPath) {
  fs.readFile(outputPath, "utf-8", (error, data) => {
    if (error) {
      stderr.write(errColor(`Error: No such file "${outputPath}"!\n`));
      exit(1);
    }
  });
}

getPipeStream(inputPath, outputPath, config);
