import ExpressionParser from "../utils/ExpressionParser";
import Operation from "../utils/Operation";
/**
 * @description Abstract base class providing  main functionality for
 * calculating algorithm
 */
export default abstract class CalculatingAlgorithm {
  protected parser: ExpressionParser;

  constructor() {
    this.parser = new ExpressionParser();
  }

  abstract evaluate(expression: string): number;

  addOperation(operation: Operation) {
    this.parser.addOperation(operation);
  }

  addConstant(key: string, value: number) {
    this.parser.addConstant(key, value);
  }
}
