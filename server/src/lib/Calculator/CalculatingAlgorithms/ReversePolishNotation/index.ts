import { ExpressionParser, Notation, Operation, Operations } from "../../internal";
import ICalculatingAlgorithm from "../interface";
import { evaluateExpression, handleParenthesis, IParams, performResidualOperations } from "./internal";

/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 * via method add addNewOperation
 * @returns {number} result of evaluation
 */
export default class ReversePolishNotation implements ICalculatingAlgorithm {
  protected operations: Map<string, Operation> = new Map();
  protected parser: ExpressionParser;

  constructor() {
    this.parser = new ExpressionParser();
    // initialize with some basics operations
    const classOperations = [
      new Operation({
        symbol: Operations.LEFT_PARENTHESIS,
        precedence: 0,
        notation: Notation.PREFIX,
        evaluate: () => 0,
      }),
      new Operation({
        symbol: Operations.RIGHT_PARENTHESIS,
        precedence: 0,
        notation: Notation.PREFIX,
        evaluate: () => 0,
      }),
    ];

    classOperations.forEach((operation) => this.parser.addOperation(operation));
  }

  addOperation(operation: Operation) {
    this.parser.addOperation(operation);
  }

  getOperations(): Operation[] {
    return this.parser.getAvailableOperations();
  }

  addConstant(key: string, value: number) {
    this.parser.addConstant(key, value);
  }

  evaluate(expression: string): number {
    expression = this.parser.replaceConstants(expression);

    const tokens = this.parser.getTokens(expression);

    const numberStack: number[] = [];
    const operatorStack: string[] = [];

    const params: IParams = {
      operatorStack,
      numberStack,
      getOperation: this.parser.getOperation.bind(this.parser),
      symbol: "",
      operation: undefined,
    };

    tokens.forEach((token) => {
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

    if (numberStack.length > 1) {
      throw new Error("Invalid expression. Several operands left");
    }

    return (numberStack.pop() as number) ?? 0;
  }

  isExpressionValid(expression: string) {
    return this.parser.isValidExpression(expression);
  }
}
