import ICalculatingAlgorithm from "./CalculatingAlgorithms/interface";
import { evaluatingAlgorithm } from "./config";
import { Constant } from "./interfaces";
import Operation from "./utils/Operation";

/**
 * @description Class that allows to add custom defined operations and evaluates expressions
 * @throws {Error} Can't operate on abstract values as Infinity
 */
export default class Calculator {
  private calculatingAlgorithm: ICalculatingAlgorithm;

  constructor() {
    this.calculatingAlgorithm = new evaluatingAlgorithm();
  }

  evaluate(expression: string): number {
    return this.calculatingAlgorithm.evaluate(expression);
  }

  // strategy pattern
  setCalculatingAlgorithm(calculatingAlgorithm: ICalculatingAlgorithm) {
    this.calculatingAlgorithm = calculatingAlgorithm;
  }

  addOperation(operation: Operation) {
    this.calculatingAlgorithm.addOperation(operation);
  }

  getOperations(): Operation[] {
    return this.calculatingAlgorithm.getOperations();
  }

  addConstant(key: string, value: number) {
    this.calculatingAlgorithm.addConstant(key, value);
  }

  getConstants(): Constant[] {
    return this.calculatingAlgorithm.getConstants();
  }

  isExpressionValid(expression: string): boolean {
    return this.calculatingAlgorithm.isExpressionValid(expression);
  }
}
