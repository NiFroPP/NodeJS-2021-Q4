const path = require("path");
const fs = require("fs");
const { pipeline, Transform } = require("stream");

const encryption = require("./src/encryption");

process.argv.slice(2);

const getFlagValue = flag => {
  const flagInd = process.argv.indexOf(flag);

  return flagInd !== -1 ? process.argv[flagInd + 1] : null;
};

const inputPath = getFlagValue("-i");
const outputPath = getFlagValue("-o");
const config = getFlagValue("-c");

const readStream = inputPath => {
  if (!inputPath) {
    process.stderr.write("Error: File to read does not exist...\n");
    process.stdout.write("Please Enter text to encode:\n");

    return process.stdin.on("data", () =>
      setImmediate(() => process.stdout.write("Enter text to encode or 'Ctrl + C' to exit:\n"))
    );
  }

  return fs.createReadStream(path.resolve(__dirname, inputPath));
};

const transformStream = (shift, code) => {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, encryption(chunk.toString(), shift, code));
    },
  });
};

const writeStream = outputFilePath => {
  if (!outputFilePath) return process.stdout;

  return fs.createWriteStream(path.resolve(__dirname, outputFilePath), { flags: "a" });
};

const getPipeStream = (inputPathName, outputPathName, config) => {
  pipeline(readStream(inputPathName), transformStream(1, 1), writeStream(outputPathName), error => {
    if (error) {
      process.stderr.write("Error: Unexpected error! Try again!");
      process.exit(1);
    }
  });
};

getPipeStream(inputPath, outputPath, config);
