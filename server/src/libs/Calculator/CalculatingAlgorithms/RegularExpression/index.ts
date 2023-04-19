import { calculate } from "./services";
import { Constant } from "../../interfaces";
import ExpressionParser from "../../utils/ExpressionParser";
import Operation from "../../utils/Operation";
import ICalculatingAlgorithm from "../interface";

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

  getOperations(): Operation[] {
    return this.parser.getAvailableOperations();
  }

  addConstant(key: string, value: number) {
    this.parser.addConstant(key, value);
  }

  getConstants(): Constant[] {
    return this.parser.getConstants();
  }

  evaluate(expression: string): number {
    if (!this.isExpressionValid(expression)) {
      throw new Error("Invalid expression. No operators found");
    }

    expression = this.parser.replaceConstants(expression);

    expression = expression.replaceAll(" ", "");

    const result = +calculate.call(this, expression);

    if (isNaN(result)) throw new Error("Invalid expression");

    return result;
  }

  isExpressionValid(expression: string) {
    return this.parser.isValidExpression(expression);
  }
}
