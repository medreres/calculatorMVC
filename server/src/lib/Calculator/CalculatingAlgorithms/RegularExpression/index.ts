import ExpressionParser from "../../utils/ExpressionParser";
import Operation from "../../utils/Operation";
import ICalculatingAlgorithm from "../interface";
import { calculate } from "./services";

/**
 * @description Parse expression using regex and recursion
 * @returns {number} result of evaluation
 */
export default class RegularExpression implements ICalculatingAlgorithm {
  protected parser: ExpressionParser;

  constructor() {
    this.parser = new ExpressionParser();
  }

  addOperation(operation: Operation) {
    this.parser.addOperation(operation);
  }

  addConstant(key: string, value: number) {
    {
      this.parser.addConstant(key, value);
    }
  }

  evaluate(expression: string): number {
    // if (!this.parser.isValidExpression(expression)) {
    //   throw new SyntaxError("Expression is invalid. Please check for correctness");
    // }

    expression = this.parser.replaceConstants(expression);

    // remove spaces
    expression = expression.replaceAll(" ", "");

    // call recursion function
    const result = +calculate.call(this, expression);

    if (isNaN(result)) throw new Error(`Invalid expression`);

    return result;
  }

  isExpressionValid(expression: string) {
    return this.parser.isValidExpression(expression);
  }
}
