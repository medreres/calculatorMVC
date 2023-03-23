import CalculatingAlgorithm from "../CalculatingAlgorithm";
import { calculate } from "./services";

export default class RegularExpression extends CalculatingAlgorithm {
  constructor() {
    super();
    console.log('RegularExpression')
  }

  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) {
      throw new SyntaxError("Expression is invalid. Please check for correctness");
    }

    expression = this.parser.replaceConstants(expression);

    // remove spaces
    expression = expression.split(" ").join("");

    const result = +calculate.call(this, expression);

    if (isNaN(result)) throw new Error(`Invalid expression`);

    return result;
  }
}
