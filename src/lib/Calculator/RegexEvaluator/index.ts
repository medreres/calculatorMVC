import { Notation } from './../../Operation/interfaces';
import { defaultOperations } from "../config";
import { IOperation } from "../../Operation/interfaces";
import { Constants, ICalculator } from "../interfaces";
import Operation from "../../Operation";
import ExpressionParser from "../ExpressionParser";
import { evaluate } from "./services";

export default class RegexEvaluator implements ICalculator {
  private constants: Map<string, number> = new Map();
  protected parser = new ExpressionParser();

  constructor() {
    // initialize parser
    // this.parser.addOperation();
  }

  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) {
      throw new SyntaxError("Expression is invalid. Please check for correctness");
    }

    expression = this.parser.replaceConstants(expression);

    // remove spaces
    expression = expression.split(" ").join("");

    const result = +evaluate.call(this, expression);

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

const calc = new RegexEvaluator();
calc.addNewOperation(new Operation("tan", 3, Notation.PREFIX, (a: number) => Math.tan(a)))
calc.evaluate('tan 0 + 10 * 3')
