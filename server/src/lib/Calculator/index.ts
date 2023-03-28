import Operation from "./utils/Operation";
import { CalculatingAlgorithm } from "./CalculatingAlgorithms";
import { evaluatingAlgorithm } from "./config";

export { default as Operation } from "./utils/Operation";
export { Operations, defaultConstants } from "./config";

export default class Calculator {
  private calculatingAlgorithm: CalculatingAlgorithm;

  constructor() {
    this.calculatingAlgorithm = new evaluatingAlgorithm();
  }

  evaluate(expression: string): number {
    return this.calculatingAlgorithm.evaluate(expression);
  }

  // strategy pattern
  setCalculatingAlgorithm(calculatingAlgorithm: CalculatingAlgorithm) {
    this.calculatingAlgorithm = calculatingAlgorithm;
  }

  addOperation(operation: Operation) {
    this.calculatingAlgorithm.addOperation(operation);
  }

  addConstant(key: string, value: number) {
    this.calculatingAlgorithm.addConstant(key, value);
  }

  isExpressionValid(expression: string): boolean {
    return this.calculatingAlgorithm.isExpressionValid(expression);
  }

  getOperations(): Operation[] {
    return this.calculatingAlgorithm.getOperations();
  }
}
