import Operation from "../../../utils/Operation";
import { Notation } from "../../../utils/Operation/interfaces";
import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Adding operations", () => {
  test("Adding sign", () => {
    const operation = new Operation({
      symbol: "sign",
      precedence: 3,
      notation: Notation.PREFIX,
      evaluate: (a: number) => Math.sign(a),
    });
    calc.addOperation(operation);

    let result = calc.evaluate("sign 10");

    expect(result).toEqual(1);
  });
});
