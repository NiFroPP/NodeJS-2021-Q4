const chars = {
  A: 65,
  Z: 90,
  a: 97,
  z: 122,
};
const ALP_LENGHT = 26;

const encoding = (text, shift) => {
  return text.split("").reduce((acc, curr, ind) => {
    const currEngChar = curr.charCodeAt();
    const isUpperCurrEngChar = currEngChar >= chars.A && currEngChar <= chars.Z; // A...Z
    const isLowerCurrEngChar = currEngChar >= chars.a && currEngChar <= chars.z; // a...z

    if (isUpperCurrEngChar) {
      return acc + String.fromCharCode(((currEngChar - chars.A + shift) % ALP_LENGHT) + chars.A);
    }

    if (isLowerCurrEngChar) {
      return acc + String.fromCharCode(((currEngChar - chars.a + shift) % ALP_LENGHT) + chars.a);
    }

    return acc + text.charAt(ind);
  }, "");
};

const decoding = (text, shift) => {
  shift = (ALP_LENGHT - shift) % ALP_LENGHT;

  return encoding(text, shift);
};

const encryption = (text, shift, code) => {
  if (code === 1) {
    return encoding(text, shift);
  }

  if (code === 0) {
    return decoding(text, shift);
  }
};

module.exports = encryption;
