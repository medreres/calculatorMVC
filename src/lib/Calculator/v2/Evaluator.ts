import { defaultOperations } from "../config";
import { IOperation, Notation } from "../Operation/interfaces";
import { Constants, ICalculator } from "../interfaces";
import Operation from "../Operation/Operation";
import Parser from "../ExpressionParser";

// TODO 2 * 3-
// TODO Nan
export default class Evaluator implements ICalculator {
  private constants: Map<string, number> = new Map();
  protected parser: Parser = new Parser();

  constructor() {
    // initialize parser
    this.parser.addOperation(...defaultOperations);
  }

  // TODO validation
  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) throw new SyntaxError("Expression is invalid");

    return +this.parser.parseExpression(expression);
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

const calc = new Evaluator();
const factorial = new Operation("!", 3, Notation.POSTFIX, (a: number) => {
  let acc = 1;
  for (let i = 1; i <= a; i++) {
    acc *= i;
  }
  return acc;
});
calc.addNewOperation(factorial);
calc.evaluate("-5 - 10");
