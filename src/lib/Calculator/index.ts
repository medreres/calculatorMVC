import Operation from "./utils/Operation";
import { ICalculatingAlgorithm, RegularExpression } from "./CalculatingAlgorithms";
import { Constants } from "./interfaces";
import ExpressionParser from "./utils/ExpressionParser";

export { default as RPNCalculator } from "./CalculatingAlgorithms/ReversePolishNotation";
export { default as RegexCalculator } from "./CalculatingAlgorithms/RegularExpression";
export { default as Operation } from "./utils/Operation";
export { Operations, defaultConstants } from "./config";

export default class Calculator {
  private calculatingAlgorithm: ICalculatingAlgorithm;
  protected parser = new ExpressionParser();

  constructor() {
    this.calculatingAlgorithm = new RegularExpression();
  }

  evaluate(expression: string): number {
    return this.calculatingAlgorithm.evaluate(expression);
  }

  //------ Operations
  addNewOperation(operation: Operation) {
    this.parser.addOperation(operation);
  }

  getAvailableOperations(): Operation[] {
    return this.parser.getAvailableOperations();
  }

  //------ Constants
  getAvailableConstants(): Constants {
    // TODO implement
    throw new Error("Not implemented");
  }

  addNewConstant(key: string, value: number) {
    this.parser.addNewConstant(key, value);
  }
}
