const { validArg } = require("../src/validation");
const { errColor, greenColor, getFlagValue, getCountArg } = require("../src/utils");

describe("Testing function validArg", () => {
  test("should return transform string", () => {
    process.argv.length = 0;
    process.argv.push("node", "index", "-c", "C1", "-c", "C0");

    const mockExit = jest.spyOn(process, "exit").mockImplementation(number => {
      throw new Error("process.exit: " + number);
    });

    expect(() => {
      validArg("-c");
    }).toThrow();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should process.exit called with 1", () => {
    process.argv.length = 0;
    process.argv.push("node", "index", "-i", "");

    const mockExit = jest.spyOn(process, "exit").mockImplementation(number => {
      throw new Error("process.exit: " + number);
    });

    expect(() => {
      validArg("-i");
    }).toThrow();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should process.exit called with 1", () => {
    process.argv.length = 0;
    process.argv.push("node", "index", "-i", "./error");

    const mockExit = jest.spyOn(process, "exit").mockImplementation(number => {
      throw new Error("process.exit: " + number);
    });

    expect(() => {
      validArg("-i");
    }).toThrow();

    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should process.exit called with 1", () => {
    process.argv.length = 0;
    process.argv.push("node", "index", "-c", "C1");

    expect(validArg("-c")).toBeUndefined();
  });
});
