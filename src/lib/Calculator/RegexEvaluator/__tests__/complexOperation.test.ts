import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Complex operations", () => {
  test("1 + 3 * 2 / 3 + (4 - 5 * 5! ^ 2 - 5)  / 100", () => {
    expect(calc.evaluate("1 + 3 * 2 / 3 + (4 - 5 * 5! ^ 2 - 5)  / 100")).toBe(-717.01);
  });

  test("1 ^ (1 ^ (1 ^ (1 ^ 10))) / 100 ^ 2", () => {
    expect(calc.evaluate("1 ^ (1 ^ (1 ^ (1 ^ 10))) / 100 ^ 2")).toBe(0.0001);
  });

  test("1 ^ (1 ^ (1 ^ (1 ^ 10)))", () => {
    expect(calc.evaluate("1 ^ (1 ^ (1 ^ (1 ^ 10)))")).toBe(1);
  });

  test("3!!", () => {
    expect(calc.evaluate("3!!")).toBe(720);
  });

  test("(3! + 5)!", () => {
    expect(calc.evaluate("(3! + 5)!")).toBe(39916800);
  });

  test("(3! + 5 * 3 ^ (5!) - 10) / 10! * 0", () => {
    expect(calc.evaluate("(3! + 5 * 3 ^ (5!) - 10) / 10! * 0")).toBe(0);
  });

  test("2 ^ (3 - 3!) = .125", () => {
    expect(calc.evaluate("2 ^ (3 - 3!)")).toBe(0.125);
  });
});
