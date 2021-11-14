const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const CHARS = {
  A: 65,
  Z: 90,
  a: 97,
  z: 122,
};
const ARGUMENTS = {
  C: "C",
  A: "A",
  R: "R",
  encod: "1",
  decod: "0",
};
const SHIFTS = {
  caesar: 1,
  rot_8: 8,
};
const OPTIONS = {
  i: "-i",
  o: "-o",
  c: "-c",
};

module.exports = { ALPHABET, CHARS, ARGUMENTS, SHIFTS, OPTIONS };
