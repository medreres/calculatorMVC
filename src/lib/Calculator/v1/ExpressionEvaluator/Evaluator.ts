import Operation from "../../Operation";
import { Operations, defaultOperations } from "../../config";
import {
  evaluateExpression,
  getOperation,
  handleParenthesis,
  IParams,
  parseExpression,
  performResidualOperations,
} from "./services";
import { Notation } from "../../Operation/interfaces";
import { ICalculator } from "../../interfaces";
import ExpressionParser from "../../ExpressionParser";

// TODO -(5+1)*3
// TODO 1/-1^(12/10)
// TODO -(( 5 + 1 ) * 3)
/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 *  via method add addNewOperation
 * @returns {number} result of evaluation
 */
export default class Evaluator implements ICalculator {
  protected operations: Map<string, Operation> = new Map();
  protected parser: ExpressionParser = new ExpressionParser();

  constructor() {
    // initialize with some basics operations
    const classOperations = [
      new Operation(Operations.LEFT_PARENTHESIS, 0, Notation.POSTFIX, () => 0),
      new Operation(Operations.RIGHT_PARENTHESIS, 0, Notation.PREFIX, () => 0),
    ];

    defaultOperations.forEach((operation) => {
      this.parser.addOperation(operation);
      this.addNewOperation(operation);
    });

    classOperations.forEach((operation) => this.operations.set(operation.symbol, operation));
  }

  addNewConstant(key: string, value: number): Evaluator {
    this.parser.addNewConstant(key, value);

    // chaining
    return this;
  }

  /**
   * @description adds new operation to the class
   * @param {Operation} operation operation being added
   */
  addNewOperation(operation: Operation): Evaluator {
    if (this.operations.has(operation.symbol)) throw new Error(`Operation "${operation.symbol} already exists`);

    this.operations.set(operation.symbol, operation);

    return this;
  }

  evaluate(expression: string): number {
    // replace all constants
    expression = this.parser.replaceConstants(expression);

    // get all the operation symbols, except function names
    const operationSymbols = Array.from(this.operations.keys()).filter((operation) => operation.length === 1);
    const tokens = parseExpression(expression, operationSymbols);

    const numberStack: number[] = [];
    const operatorStack: string[] = [];

    const params: IParams = {
      operatorStack,
      numberStack,
      getOperation: getOperation.bind(this),
      symbol: "",
      operation: undefined,
    };

    tokens.forEach((token, index) => {
      if (!isNaN(token as number)) return numberStack.push(Number(token));

      params.symbol = token as string;
      if (token === Operations.LEFT_PARENTHESIS || token === Operations.RIGHT_PARENTHESIS)
        return handleParenthesis(params);

      params.operation = getOperation.call(this, token as string);
      if (params.operation) return evaluateExpression(params);

      throw new Error(`Invalid character ${token} at position ${index}`);
    });

    performResidualOperations(params);

    if (numberStack.length > 1) throw new Error("Invalid expression. Several operands left");

    return (numberStack.pop() as number) ?? 0;
  }

  getAvailableOperations(): Operation[] {
    return Array.from(this.operations.values());
  }
}
