const { pipeline, Transform } = require("stream");
const encryption = require("./encryption");
const { errColor, greenColor } = require("./utils");
const { OPTIONS } = require("./constants");
const WriteStream = require("./WriteStream");
const ReadStream = require("./ReadStream");

const readStream = inputPath => {
  if (process.argv.indexOf(OPTIONS.i) === -1) {
    process.stderr.write(greenColor(`You have not entered the "-i" flag, so...\n`));
    process.stdout.write(greenColor("Please Enter the text to encode into the console:\n"));

    return process.stdin.on("data", () =>
      setImmediate(() => process.stdout.write(greenColor("Enter text to encode or 'Ctrl + C' to exit:\n")))
    );
  }

  return new ReadStream(inputPath);
};

const transformStream = config => {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, encryption(chunk.toString(), config));
    },
  });
};

const writeStream = outputFilePath => {
  if (process.argv.indexOf(OPTIONS.o) === -1) {
    return process.stdout;
  }

  return new WriteStream(outputFilePath, "a");
};

const getPipeStream = (inputPathName, outputPathName, config) => {
  pipeline(readStream(inputPathName), transformStream(config), writeStream(outputPathName), error => {
    if (error) {
      process.stderr.write(errColor(`Error: ${error.message}! Try again!\n`));
      process.exit(1);
    }
  });
};

module.exports = getPipeStream;
