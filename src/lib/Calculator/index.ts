import Operation from "./utils/Operation";
import { ICalculatingAlgorithm, RegularExpression, ReversePolishNotation } from "./CalculatingAlgorithms";
import ExpressionParser from "./utils/ExpressionParser";

export { default as RPNCalculator } from "./CalculatingAlgorithms/ReversePolishNotation";
export { default as RegexCalculator } from "./CalculatingAlgorithms/RegularExpression";
export { default as Operation } from "./utils/Operation";
export { Operations, defaultConstants } from "./config";

// TODO  tan 1 sin 5
// TODO switchable
// TODO (1+2)*(2+3)
export default class Calculator {
  private calculatingAlgorithm: ICalculatingAlgorithm;
  protected parser;

  constructor() {
    this.parser = new ExpressionParser();

    this.calculatingAlgorithm = new ReversePolishNotation(this.parser);
  }

  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) {
      throw new Error("Invalid expression");
    }

    expression = this.parser.replaceConstants(expression);

    return this.calculatingAlgorithm.evaluate(expression);
  }

  //------ Operations
  addNewOperation(operation: Operation) {
    this.parser.addOperation(operation);
  }

  // getAvailableOperations(): Operation[] {
  //   return this.parser.getAvailableOperations();
  // }

  addNewConstant(key: string, value: number) {
    this.parser.addNewConstant(key, value);
  }
}

// const calc = new Calculator();
// calc.evaluate('( 1 + 2 ) * ( 1 + 3 )')
