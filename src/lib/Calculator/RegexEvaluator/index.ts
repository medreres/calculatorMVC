import { defaultOperations } from "../config";
import { IOperation } from "../../Operation/interfaces";
import { Constants, ICalculator } from "../interfaces";
import Operation from "../../Operation";
import ExpressionParser from "../../ExpressionParser";

export default class RegexEvaluator implements ICalculator {
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
  addNewOperation(operation: IOperation): RegexEvaluator {
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

  addNewConstant(key: string, value: number): RegexEvaluator {
    this.parser.addNewConstant(key, value);
    return this;
  }
}

// const calc = new RegexEvaluator();
// const factorial = new Operation("!", 3, Notation.POSTFIX, (a: number) => {
//   let acc = 1;
//   for (let i = 1; i <= a; i++) {
//     acc *= i;
//   }
//   return acc;
// });

// calc.addNewOperation(factorial);
// calc.evaluate('(3! + 5 * 3 ^ (5!) - 10) / 10! * 0')
