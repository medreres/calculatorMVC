import CalculatingAlgorithm from "../CalculatingAlgorithm";
import { calculate } from "./services";

/**
 * @description Parse expression using regex and recursion
 * @returns {number} result of evaluation
 */
export default class RegularExpression extends CalculatingAlgorithm {
  constructor() {
    super();
  }

  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) {
      throw new SyntaxError("Expression is invalid. Please check for correctness");
    }

    expression = this.parser.replaceConstants(expression);

    // remove spaces
    expression = expression.split(" ").join("");

    // call recursion function
    const result = +calculate.call(this, expression);

    if (isNaN(result)) throw new Error(`Invalid expression`);

    return result;
  }
}
