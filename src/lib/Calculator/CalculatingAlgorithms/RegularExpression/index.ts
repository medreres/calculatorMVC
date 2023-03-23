import ExpressionParser from "../../utils/ExpressionParser";
import { calculate } from "./services";
import { ICalculatingAlgorithm } from "..";

export default class RegularExpression implements ICalculatingAlgorithm {
  protected parser: ExpressionParser;
  
  constructor(parser: ExpressionParser) {
    this.parser = parser;
  }

  evaluate(expression: string): number {
    // if (!this.parser.isValidExpression(expression)) {
    //   throw new SyntaxError("Expression is invalid. Please check for correctness");
    // }

    // expression = this.parser.replaceConstants(expression);

    // remove spaces
    expression = expression.split(" ").join("");

    const result = +calculate.call(this, expression);

    if (isNaN(result)) throw new Error(`Invalid expression`);

    return result;
  }
}
