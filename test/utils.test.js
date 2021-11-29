const { errColor, greenColor, getFlagValue, getCountArg } = require("../src/utils");

describe("Testing function errColor", () => {
  test("should return transform string", () => {
    expect(errColor("ABC")).toBe("\x1b[31mABC\x1b[0m");
    expect(errColor("ABCDF")).toBe("\x1b[31mABCDF\x1b[0m");
  });
  test("should be string length equal 12", () => {
    expect(errColor("ABC")).toHaveLength(12);
    expect(errColor("ABC123")).toHaveLength(15);
  });
});

describe("Testing function greenColor", () => {
  test("should return transform string", () => {
    expect(greenColor("ABC")).toBe("\x1b[32mABC\x1b[0m");
    expect(greenColor("ABCDF")).toBe("\x1b[32mABCDF\x1b[0m");
  });

  test("should be string length equal 14", () => {
    expect(greenColor("ABCDF")).toHaveLength(14);
    expect(greenColor("ABCDF12345")).toHaveLength(19);
  });
});

describe("Testing function getFlagValue", () => {
  beforeEach(() => {
    process.argv.push("--arg1", "value1");
    process.argv.push("--arg2", "value2");
    process.argv.push("--arg3", "");
  });

  test("should return 'value1'", () => {
    expect(getFlagValue("--arg1")).toBe("value1");
  });

  test("should return 'value2'", () => {
    expect(getFlagValue("--arg2")).toBe("value2");
  });

  test("should return '' ", () => {
    expect(getFlagValue("--arg3")).toBe("");
  });

  test("should return '' ", () => {
    expect(getFlagValue("--undefined")).toBe("");
  });
});

describe("Testing function getCountArg", () => {
  beforeEach(() => {
    process.argv.push("--test", "value1");
    process.argv.push("--test", "value2");
    process.argv.push("--test", "value3");
  });

  test("should return 3", () => {
    expect(getCountArg("--test")).toEqual(3);
  });
});
