import { Operations } from "../config";
import { evaluateExpression, handleParenthesis, IParams, parseExpression, performResidualOperations } from "./services";
import { Notation } from "../../Operation/interfaces";
import { ICalculator } from "../interfaces";
import ExpressionParser from "../ExpressionParser";
import Operation from "../../Operation";

/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 * via method add addNewOperation
 * @returns {number} result of evaluation
 */
export default class ReversePolishNotationEvaluator implements ICalculator {
  protected operations: Map<string, Operation> = new Map();
  protected parser = new ExpressionParser();

  constructor() {
    // initialize with some basics operations
    const classOperations = [
      new Operation(Operations.LEFT_PARENTHESIS, 0, Notation.POSTFIX, () => 0),
      new Operation(Operations.RIGHT_PARENTHESIS, 0, Notation.PREFIX, () => 0),
    ];

    classOperations.forEach((operation) => this.parser.addOperation(operation));
  }

  addNewConstant(key: string, value: number): ReversePolishNotationEvaluator {
    this.parser.addNewConstant(key, value);

    // chaining
    return this;
  }

  /**
   * @description adds new operation to the class
   * @param {Operation} operation operation being added
   */
  addNewOperation(operation: Operation): ReversePolishNotationEvaluator {
    if (this.operations.has(operation.symbol)) throw new Error(`Operation "${operation.symbol} already exists`);
    this.operations.set(operation.symbol, operation);

    return this;
  }

  evaluate(expression: string): number {
    // replace all constants
    expression = this.parser.replaceConstants(expression);

    // get all the operation symbols, except function names
    const operationSymbols = Array.from(this.parser.getAvailableOperations())
      .filter((operation) => operation.symbol.length === 1)
      .map((operation) => operation.symbol);
    const tokens = parseExpression(expression, operationSymbols);

    const numberStack: number[] = [];
    const operatorStack: string[] = [];

    const params: IParams = {
      operatorStack,
      numberStack,
      getOperation: this.parser.getOperation.bind(this.parser),
      symbol: "",
      operation: undefined,
    };

    tokens.forEach((token, index) => {
      if (!isNaN(token as number)) return numberStack.push(Number(token));

      params.symbol = token as string;
      if (token === Operations.LEFT_PARENTHESIS || token === Operations.RIGHT_PARENTHESIS)
        return handleParenthesis(params);

      // params.operation = getOperation.call(this, token as string);
      params.operation = this.parser.getOperation(token as string);
      if (params.operation) return evaluateExpression(params);

      throw new Error(`Invalid character ${token} `);
    });

    performResidualOperations(params);

    if (numberStack.length > 1) throw new Error("Invalid expression. Several operands left");

    return (numberStack.pop() as number) ?? 0;
  }

  getAvailableOperations(): Operation[] {
    return Array.from(this.operations.values());
  }
}

const calc = new ReversePolishNotationEvaluator();
calc.evaluate("1 + 2");
