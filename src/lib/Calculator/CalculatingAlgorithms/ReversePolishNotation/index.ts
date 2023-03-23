import { Operations } from "../../config";
import { evaluateExpression, handleParenthesis, IParams, performResidualOperations } from "./services";
import { Notation } from "../../utils/Operation/interfaces";
import Operation from "../../utils/Operation";
import CalculatingAlgorithm from "../CalculatingAlgorithm";

/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 * via method add addNewOperation
 * @returns {number} result of evaluation
 */
export default class ReversePolishNotation extends CalculatingAlgorithm {
  protected operations: Map<string, Operation> = new Map();

  constructor() {
    super();
    // initialize with some basics operations
    const classOperations = [
      new Operation(Operations.LEFT_PARENTHESIS, 0, Notation.POSTFIX, () => 0),
      new Operation(Operations.RIGHT_PARENTHESIS, 0, Notation.PREFIX, () => 0),
    ];

    classOperations.forEach((operation) => this.parser.addOperation(operation));
  }

  evaluate(expression: string): number {
    if (!this.parser.isValidExpression(expression)) {
      throw new SyntaxError("Expression is invalid. Please check for correctness");
    }

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

    if (numberStack.length > 1) throw new Error("Invalid expression. Several operands left");

    return (numberStack.pop() as number) ?? 0;
  }
}
