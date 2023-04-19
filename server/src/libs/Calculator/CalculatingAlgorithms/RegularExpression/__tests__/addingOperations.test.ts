import { initializeCalculator } from "./utils";

import Operation, { Notation } from "@/libs/Calculator/utils/Operation";

const calc = initializeCalculator();

// FIXME g in sign could potentially be replaced sign -> si9.81n
describe("Adding operations", () => {
  test("Adding sign", () => {
    const operation = new Operation({
      symbol: "sign",
      precedence: 3,
      notation: Notation.PREFIX,
      evaluate: (a: number) => Math.sign(a),
    });
    calc.addOperation(operation);

    const result = calc.evaluate("sign 10");

    expect(result).toEqual(1);
  });
});
