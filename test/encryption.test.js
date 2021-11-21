const encryption = require("../src/encryption");

let inputText = 'This is secret. Message about "_" symbol!';
const config1 = {
  input: "C1-C1-R0-A",
  output: 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!',
};
const config2 = {
  input: "C1-C0-A-R1-R0-A-R0-R0-C1-A",
  output: 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!',
};
const config3 = {
  input: "A-A-A-R1-R0-R0-R0-C1-C1-A",
  output: 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!',
};
const config4 = {
  input: "C1-R1-C0-C0-A-R0-R1-R1-A-C1",
  output: 'This is secret. Message about "_" symbol!',
};
const errorConfig = {
  C: "C2",
  A: "A2",
  R: "R2",
  empty: "",
};

describe("Testing function encryption", () => {
  test("should return encryption text", () => {
    expect(encryption(inputText, config1.input)).toBe(config1.output);
    expect(encryption(inputText, config2.input)).toBe(config2.output);
    expect(encryption(inputText, config3.input)).toBe(config3.output);
    expect(encryption(inputText, config4.input)).toBe(config4.output);
  });

  test("should exit the program", () => {
    process.argv.push("-c", "C1");

    const mockExit = jest.spyOn(process, "exit").mockImplementation(number => {
      throw new Error("process.exit: " + number);
    });

    expect(() => {
      encryption(config1.input, errorConfig.C);
    }).toThrow();

    expect(() => {
      encryption(config1.input, errorConfig.A);
    }).toThrow();

    expect(() => {
      encryption(config1.input, errorConfig.R);
    }).toThrow();

    expect(() => {
      encryption(config1.input, errorConfig.empty);
    }).toThrow();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });
});
