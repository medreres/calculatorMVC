import Operation from "../../../Operation";
import { Notation } from "../../../Operation/interfaces";
import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Adding operations", () => {
  test("Adding tan function", () => {
    const operation = new Operation("tan", 3, Notation.PREFIX, (a: number) => Math.tan(a));
    calc.addNewOperation(operation);

    let result = calc.evaluate("tan 0 + 10 * 3");

    expect(result).toEqual(30);
  });
});
