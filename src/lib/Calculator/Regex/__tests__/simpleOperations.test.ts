import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Simple operations", () => {
  test("1 + 3", () => {
    expect(calc.evaluate("1 + 3")).toBe(4);
  });

  test("-(5 + 1) * 3", () => {
    expect(calc.evaluate("-(5 + 1) * 3")).toBe(-18);
  });
  

  test("PI * 3", () => {
    expect(calc.evaluate("PI * 3")).toBe(9.42477796076938);
  });

  test("1 + 3 + 5", () => {
    expect(calc.evaluate("1 + 3 + 5")).toBe(9);
  });

  test("1 + 3 - 10", () => {
    expect(calc.evaluate("1 + 3 - 10")).toBe(-6);
  });

  test("-5 - 10", () => {
    expect(calc.evaluate("-5 - 10")).toBe(-15);
  });

  test("-5 + 10", () => {
    expect(calc.evaluate("-5 + 10")).toBe(5);
  });

  test("1 * 5", () => {
    expect(calc.evaluate("1 * 5")).toBe(5);
  });

  test("1 / 5", () => {
    expect(calc.evaluate("1 / 5")).toBe(1 / 5);
  });

  test("1 / 2 / 2", () => {
    expect(calc.evaluate("1 / 2 / 2")).toBe(1 / 4);
  });

  test("1 * 0", () => {
    expect(calc.evaluate("1 * 0")).toBe(0);
  });

  test("2 ^ 3", () => {
    expect(calc.evaluate("2 ^ 3")).toBe(8);
  });

  test("5!", () => {
    expect(calc.evaluate("5!")).toBe(120);
  });
});
