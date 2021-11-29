const errColor = text => `\x1b[31m${text}\x1b[0m`;
const greenColor = text => `\x1b[32m${text}\x1b[0m`;

const getFlagValue = flag => {
  const flagInd = process.argv.indexOf(flag);
  return flagInd !== -1 ? process.argv[flagInd + 1] || "" : "";
};

const getCountArg = flag => {
  let count = 0;
  let pos = -1;
  while ((pos = process.argv.indexOf(flag, pos + 1)) !== -1) {
    count++;
  }
  return count;
};

module.exports = { errColor, greenColor, getFlagValue, getCountArg };
