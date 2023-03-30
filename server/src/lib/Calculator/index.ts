import { Constant } from "./interfaces";
import { evaluatingAlgorithm, CalculatingAlgorithm, Operation } from "./internal";
export { default as Operation } from "./utils/Operation";

export default class Calculator {
  private calculatingAlgorithm: CalculatingAlgorithm;

  constructor() {
    this.calculatingAlgorithm = new evaluatingAlgorithm();
  }

  evaluate(expression: string): number {
    //? TODO toFixed to avoid cluttering?
    return this.calculatingAlgorithm.evaluate(expression);
  }

  // strategy pattern
  setCalculatingAlgorithm(calculatingAlgorithm: CalculatingAlgorithm) {
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
    return this.calculatingAlgorithm.getConstants()
  }

  isExpressionValid(expression: string): boolean {
    return this.calculatingAlgorithm.isExpressionValid(expression);
  }

 
}
