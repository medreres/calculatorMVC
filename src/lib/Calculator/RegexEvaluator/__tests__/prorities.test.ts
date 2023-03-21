import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Priorities", () => {
  test("1 + 3 * 2", () => {
    expect(calc.evaluate("1 + 3 * 2")).toBe(7);
  });

  test("2 * 2 + 2", () => {
    expect(calc.evaluate("2 * 2 + 2")).toBe(6);
  });

  test("-(( 5 + 1 ) * 3)", () => {
    expect(calc.evaluate("-(( 5 + 1 ) * 3)")).toBe(-18);
  });

  test("2 * 2 + 2 * 2", () => {
    expect(calc.evaluate("2 * 2 + 2 * 2")).toBe(8);
  });

  test("(2 + 2 ) * 2", () => {
    expect(calc.evaluate("(2 + 2 ) * 2")).toBe(8);
  });

  test("(2 + 2 + (1 - ( 2 + 3 * (1 - 5))) ) * 2", () => {
    expect(calc.evaluate("(2 + 2 + (1 - ( 2 + 3 * (1 - 5))) ) * 2")).toBe(30);
  });

  test("(1 + ( 1 + (1 + (1 + (1)) * 2)) / 3) * 10", () => {
    expect(calc.evaluate("(1 + ( 1 + (1 + (1 + (1)) * 2)) / 3) * 10")).toBe(30);
  });

  test("1 / 10 / 10 / 10 * 20 + (30 * 10) + 2", () => {
    expect(calc.evaluate("1 / 10 / 10 / 10 * 20 + (30 * 10) + 2")).toBe(302.02);
  });

  test("1 / 4 + ( 2 * 1 / 2)", () => {
    expect(calc.evaluate("1 / 4 + ( 2 * 1 / 2)")).toBe(1.25);
  });

  test("1 / 5 + 4 / 2", () => {
    expect(calc.evaluate("1 / 5 + 4 / 2")).toBe(2.2);
  });

  test("10 + 2 ^ 3", () => {
    expect(calc.evaluate("10 + 2 ^ 3")).toBe(18);
  });

  test("2 ^ (300 ^ 0)", () => {
    expect(calc.evaluate("2 ^ (300 ^ 0)")).toBe(2);
  });

  test("2+5-3=4", () => {
    expect(calc.evaluate("2+5-3")).toBe(4);
  });

  test("-3-5-10", () => {
    expect(calc.evaluate("-3-5-10")).toBe(-18);
  });

  test("2 + 10 + 10 - 10 + 10 + (-10-10)", () => {
    expect(calc.evaluate("2 + 10 + 10 - 10 + 10 + (-10-10)")).toBe(2);
  });
});
