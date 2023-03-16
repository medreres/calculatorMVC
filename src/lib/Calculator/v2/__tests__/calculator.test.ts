import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Calculating algorithm", () => {
  describe("Simple operations", () => {
    test("1 + 3", () => {
      let result = 4;
      let expression = "1 + 3";
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("PI * 3", () => {
      let result = 9.42477796076938;
      let expression = "PI * 3";
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 + 3 + 5", () => {
      let expression = "1 + 3 + 5";
      let result = 9;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 + 3 - 10", () => {
      let expression = "1 + 3 - 10";
      let result = -6;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("-5 - 10", () => {
      let expression = "-5 - 10";
      let result = -15;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("-5 + 10", () => {
      let expression = "-5 + 10";
      let result = 5;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 * 5", () => {
      let expression = "1 * 5";
      let result = 5;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 / 5", () => {
      let expression = "1 / 5";
      let result = 1 / 5;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 / 2 / 2", () => {
      let expression = "1 / 2 / 2";
      let result = 0.25;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("1 * 0", () => {
      let expression = "1 * 0";
      let result = 0;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("2 ^ 3", () => {
      let expression = "2 ^ 3";
      let result = 8;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("5!", () => {
      expect(calc.evaluate("5!")).toBe(120);
    });
  });

  describe("Priorities", () => {
    test("1 + 3 * 2", () => {
      let expression = "1 + 3 * 2";
      let result = 7;
      expect(calc.evaluate(expression)).toBe(result);
    });

    test("2 * 2 + 2", () => {
      expect(calc.evaluate("2 * 2 + 2")).toBe(6);
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
  });
});
