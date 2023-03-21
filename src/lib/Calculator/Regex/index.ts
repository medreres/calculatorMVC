import { defaultOperations } from "../config";
import { IOperation } from "../../Operation/interfaces";
import { Constants, ICalculator } from "../interfaces";
import Operation from "../../Operation";
import ExpressionParser from "../../ExpressionParser";

// TODO FIX SPACE BETWEEN CHARACTERS
export default class Evaluator implements ICalculator {
  private constants: Map<string, number> = new Map();
  protected parser = new ExpressionParser();

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

// const calc = new Evaluator();
// console.log(calc.evaluate('( 2 + 3 * -4)'))