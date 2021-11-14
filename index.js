const path = require("path");
const { getFlagValue } = require("./src/utils");
const { validArg } = require("./src/validation");
const { OPTIONS } = require("./src/constants");

const getPipeStream = require("./src/streams");

validArg(OPTIONS.i);
validArg(OPTIONS.o);
validArg(OPTIONS.c);

const inputPath = path.resolve(__dirname, getFlagValue(OPTIONS.i));
const outputPath = path.resolve(__dirname, getFlagValue(OPTIONS.o));
const config = getFlagValue(OPTIONS.c);

getPipeStream(inputPath, outputPath, config);
