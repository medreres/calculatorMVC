import Operation from "./utils/Operation";
import { CalculatingAlgorithm } from "./CalculatingAlgorithms";
import { evaluatingAlgorithm } from "./config";

export { default as Operation } from "./utils/Operation";
export { Operations, defaultConstants } from "./config";

// TODO  tan 1 sin 5
// TODO switchable
// TODO (1+2)*(2+3)
// TODO 5 PI
export default class Calculator {
  private calculatingAlgorithm: CalculatingAlgorithm;

  constructor() {
    this.calculatingAlgorithm = new evaluatingAlgorithm();
  }

  evaluate(expression: string): number {
    const result = this.calculatingAlgorithm.evaluate(expression);

    return result;
  }

  setCalculatingAlgorithm(calculatingAlgorithm: CalculatingAlgorithm) {
    this.calculatingAlgorithm = calculatingAlgorithm;
  }

  //------ Operations
  addOperation(operation: Operation) {
    this.calculatingAlgorithm.addOperation(operation);
  }

  addConstant(key: string, value: number) {
    this.calculatingAlgorithm.addConstant(key, value);
  }
}

// TODO remove
const calc = new Calculator();
calc.evaluate("(3! + 5)!");
