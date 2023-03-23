import Operation from "../../../utils/Operation";
import { Notation } from "../../../utils/Operation/interfaces";
import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Adding operations", () => {
  test("Adding tan function", () => {
    const operation = new Operation("tan", 3, Notation.PREFIX, (a: number) => Math.tan(a));
    calc.addNewOperation(operation);

    let result = calc.evaluate("tan 0 + 10 * 3");

    expect(result).toEqual(30);
  });

  test("Adding sign", () => {
    const operation = new Operation("sign", 3, Notation.PREFIX, (a: number) => Math.sign(a));
    calc.addNewOperation(operation);

    let result = calc.evaluate("sign 10");

    expect(result).toEqual(1);
  });

  test("Adding sign", () => {
    let result = calc.evaluate("sign -1123");

    expect(result).toEqual(-1);
  });
});
