const fs = require("fs");
const { pipeline, Transform } = require("stream");
const encryption = require("./encryption");
const { errColor, greenColor } = require("./utils");

const readStream = inputPath => {
  if (!inputPath) {
    process.stderr.write("Error: File to read does not exist...\n");
    process.stdout.write("Please Enter text to encode:\n");

    return process.stdin.on("data", () =>
      setImmediate(() => process.stdout.write(greenColor("Enter text to encode or 'Ctrl + C' to exit:\n")))
    );
  }

  const stream = fs.createReadStream(inputPath);
  stream.on("error", error => process.stdout.write("Error", errColor(`Error read stream: ${error.message}\n`)));
  return stream;
};

const transformStream = config => {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, encryption(chunk.toString(), config));
    },
  });
};

const writeStream = outputFilePath => {
  console.log("outputPath: " + outputFilePath);

  if (outputFilePath === "") {
    process.stdout.write("Your encoding text:\n");
    return process.stdout;
  }
  const stream = fs.createWriteStream(outputFilePath, { flags: "a" });
  stream.on("error", error => process.stdout.write("Error", errColor(`Error write stream: ${error.message}\n`)));

  return stream;
};

const getPipeStream = (inputPathName, outputPathName, config) => {
  pipeline(readStream(inputPathName), transformStream(config), writeStream(outputPathName), error => {
    if (error) {
      process.stderr.write(`Error: ${error.message}! Try again!\n`);
      process.exit(1);
    }
  });
};

module.exports = getPipeStream;
