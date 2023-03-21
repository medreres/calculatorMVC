import { evaluator } from "./utils";

describe("Respecting priorities", () => {
  test("2 + 2 * 2 = 6", () => {
    expect(evaluator.evaluate("2 + 2 * 2")).toBe(6);
  });

  test("( 2 + 2 * 2 ) * 3 = 18", () => {
    expect(evaluator.evaluate("( 2 + 2 * 2 ) * 3")).toBe(18);
  });

  test("( 1 + ( 2 + ( 3 + ( 4 + 5 ) ) ) ) = 15", () => {
    expect(evaluator.evaluate("( 1 + ( 2 + ( 3 + ( 4 + 5 ) ) ) )")).toBe(15);
  });

  test("( 1 + 2 ) * ( 1 + 3 ) = 12", () => {
    expect(evaluator.evaluate("( 1 + 2 ) * ( 1 + 3 )")).toBe(12);
  });

  test("lg ( 10 ^ 0 + 1 ) = 0.3010299956639812", () => {
    expect(evaluator.evaluate("lg ( 10 ^ 0 + 1 )")).toBe(0.3010299956639812);
  });

  test("3 ^ (2 ^ 3) = 6561", () => {
    expect(evaluator.evaluate("3 ^ (2 ^ 3)")).toBe(6561);
  });

  test("1 ^ (ln 1) = 1", () => {
    expect(evaluator.evaluate("1 ^ (ln 1)")).toBe(1);
  });

  test("2 ^ (3 !) = 64", () => {
    expect(evaluator.evaluate("2 ^ (3 !)")).toBe(64);
  });

  test("2 ^ (3 - 3!) = .125", () => {
    expect(evaluator.evaluate("2 ^ (3 - 3!)")).toBe(.125);
  });
});
