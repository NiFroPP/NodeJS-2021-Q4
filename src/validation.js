const fs = require("fs");
const { errColor, getCountArg, getFlagValue } = require("./utils");
const { OPTIONS } = require("./constants");

const validArg = arg => {
  let argPath = getFlagValue(arg);

  if (getCountArg(arg) > 1) {
    process.stderr.write(errColor(`ERROR: Argument "${arg}" must not be repeated...\n`));
    process.exit(1);
  }

  if (process.argv.includes(arg) && argPath === "") {
    process.stderr.write(errColor(`Path for the file with the argument "${arg}" is not passed\n`));
    process.exit(1);
  }

  if (arg !== OPTIONS.c) {
    if (argPath) {
      fs.access(argPath, (error, data) => {
        if (error) {
          process.stderr.write(errColor(`No such file "${argPath}"!\n`));
          process.exit(1);
        }
      });
    }
  }
};

module.exports = { validArg };
