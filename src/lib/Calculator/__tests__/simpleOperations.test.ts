import { evaluator } from "./utils";

describe("Simple operations.", () => {
  test("1 + 2 = 3", () => {
    expect(evaluator.evaluate("1 + 2")).toBe(3);
  });

  test("-2=-2", () => {
    expect(evaluator.evaluate("-2")).toBe(-2);
  });

  test("-2 - 3 - 5 = -10", () => {
    expect(evaluator.evaluate("-2 - 3 - 5")).toBe(-10);
  });

  test("-2 -4 +5 = -1", () => {
    expect(evaluator.evaluate("-2 -4 +5")).toBe(-1);
  });

  test("-2 + -2 = -4", () => {
    expect(evaluator.evaluate("-2+-2")).toBe(-4);
  });

  test("Empty expression = 0", () => {
    expect(evaluator.evaluate("")).toBe(0);
  });

  test("1  * 2 = 2", () => {
    expect(evaluator.evaluate("1 * 2")).toBe(2);
  });

  test("1 * 0 = 0", () => {
    expect(evaluator.evaluate("1 * 0")).toBe(0);
  });

  test("0 * 0 = 0", () => {
    expect(evaluator.evaluate("0 * 0")).toBe(0);
  });

  test("1 / 0 = Inf", () => {
    expect(evaluator.evaluate("1 / 0")).toBe(Infinity);
  });

  test("1 ^ 0 = 1", () => {
    expect(evaluator.evaluate("1 ^ 0")).toBe(1);
  });

  test("10 ^ 0 = 1", () => {
    expect(evaluator.evaluate("10 ^ 0")).toBe(1);
  });

  test("2 ^ 3 = 8", () => {
    expect(evaluator.evaluate("2 ^ 3")).toBe(8);
  });

  test("tan 0 = 0", () => {
    expect(evaluator.evaluate("tan 0")).toBe(0);
  });

  test("5 ! + 20 = 140", () => {
    expect(evaluator.evaluate("5 ! + 20")).toBe(140);
  });

  test("0! = 1", () => {
    expect(evaluator.evaluate("0 !")).toBe(1);
  });

  test("0 * 2 + 3 - 10 = -7", () => {
    expect(evaluator.evaluate("0 * 2 + 3 - 10 ")).toBe(-7);
  });
});
