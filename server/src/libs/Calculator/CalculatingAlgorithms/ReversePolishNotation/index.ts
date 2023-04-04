import { Operations } from "../../config";
import { Constant } from "../../interfaces";
import ExpressionParser from "../../utils/ExpressionParser";
import Operation from "../../utils/Operation";
import ICalculatingAlgorithm from "../interface";
import { IParams } from "./interfaces";
import { handleParenthesis, evaluateExpression, performResidualOperations } from "./services";

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

  getConstants(): Constant[] {
    return this.parser.getConstants();
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
