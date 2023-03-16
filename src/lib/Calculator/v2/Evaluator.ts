import { defaultOperations } from "../config";
import { IOperation } from "../Operation/interfaces";
import { Constants, ICalculator } from "../interfaces";
import Operation from "../Operation";
import Parser from "../ExpressionParser";
import { initializeCalculator } from "./__tests__/utils";

// ? 1 / -1 ^ 1.2 javascript produces Nan from -1 ^ 1.2 ??
export default class Evaluator implements ICalculator {
  private constants: Map<string, number> = new Map();
  protected parser: Parser = new Parser();

  constructor() {
    // initialize parser
    this.parser.addOperation(...defaultOperations);
  }

  evaluate(expression: string): number {
    const result = this.parser.parseExpression(expression);

    if (isNaN(result)) throw new Error(`Invalid expression`);

    return result;
  }

  //------ Operations
  addNewOperation(operation: IOperation): Evaluator {
    this.parser.addOperation(operation);
    return this;
  }

  getAvailableOperations(): Operation[] {
    return this.parser.getAvailableOperations();
  }

  //------ Constants
  getAvailableConstants(): Constants {
    const constants: Constants = {};

    Array.from(this.constants).forEach(([key, value]) => {
      constants[key] = value;
    });

    return constants;
  }

  addNewConstant(key: string, value: number): Evaluator {
    this.parser.addNewConstant(key, value);
    return this;
  }
}

// initializeCalculator().evaluate("1 + 3 * (2");
