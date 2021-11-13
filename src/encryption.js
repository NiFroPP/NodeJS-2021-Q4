const { ALPHABET, CHARS, ARGUMENTS, SHIFTS } = require("./constants");
const { errColor } = require("./utils");

const encodShiftCipher = (text, shift) => {
  return text.split("").reduce((acc, curr, ind) => {
    const currEngChar = curr.charCodeAt();
    const isUpperCurrEngChar = currEngChar >= CHARS.A && currEngChar <= CHARS.Z; // A...Z
    const isLowerCurrEngChar = currEngChar >= CHARS.a && currEngChar <= CHARS.z; // a...z

    if (isUpperCurrEngChar) {
      return acc + String.fromCharCode(((currEngChar - CHARS.A + shift) % ALPHABET.length) + CHARS.A);
    }

    if (isLowerCurrEngChar) {
      return acc + String.fromCharCode(((currEngChar - CHARS.a + shift) % ALPHABET.length) + CHARS.a);
    }

    return acc + text.charAt(ind);
  }, "");
};

const decodShiftCipher = (text, shift) => {
  shift = (ALPHABET.length - shift) % ALPHABET.length;

  return encodShiftCipher(text, shift);
};

const atbashCipher = text => {
  const alpArr = ALPHABET.split("");
  const alpReverseArr = ALPHABET.split("").reverse();

  return text
    .split("")
    .map(char => {
      const currChar = char.charCodeAt();
      const isUpperCurrChar = currChar >= CHARS.A && currChar <= CHARS.Z;
      const isLowerCurrChar = currChar >= CHARS.a && currChar <= CHARS.z;

      if (isUpperCurrChar) {
        const index = alpArr.findIndex(ind => ind === char.toLowerCase());
        const letter = alpReverseArr[index];
        return letter.toUpperCase();
      }

      if (isLowerCurrChar) {
        const index = alpArr.findIndex(ind => ind === char);
        return alpReverseArr[index];
      }

      return char;
    })
    .join("");
};

const encoding = (text, [cipher, codeFlag]) => {
  switch (cipher) {
    case ARGUMENTS.C:
      if (codeFlag === ARGUMENTS.encod) return encodShiftCipher(text, SHIFTS.caesar);
      if (codeFlag === ARGUMENTS.decod) return decodShiftCipher(text, SHIFTS.caesar);
      process.stderr.write(errColor(`Please, enter correct code "C1" or "C0"...\n`));
      process.exit(1);

    case ARGUMENTS.A:
      if (codeFlag) {
        process.stderr.write(errColor("Please, enter correct code 'A'...\n"));
        process.exit(1);
      }
      return atbashCipher(text);

    case ARGUMENTS.R:
      if (codeFlag === ARGUMENTS.encod) return encodShiftCipher(text, SHIFTS.rot_8);
      if (codeFlag === ARGUMENTS.decod) return decodShiftCipher(text, SHIFTS.rot_8);
      process.stderr.write(errColor(`Please, enter correct code "R1" or "R0"...\n`));
      process.exit(1);

    default:
      process.stderr.write(errColor(`There is no such code "${cipher}"!\n`));
      process.stderr.write(errColor(`Please, enter correct code "C0", "C1", "A", "R0" or "R1"...\n`));
      process.exit(1);
  }
};

const encryption = (text, config) => {
  let configArr = config.split("-");
  let currText = text;

  for (let i = 0; i < configArr.length; i++) {
    currText = encoding(currText, configArr[i]);
  }

  return currText;
};

module.exports = encryption;
