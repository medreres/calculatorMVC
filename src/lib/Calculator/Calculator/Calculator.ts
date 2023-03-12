import Operation from "../Operation/Operation";
import { ICalculator } from "./interface";
import { Operations, defaultOperations } from "./config";
import { evaluateExpression, handleParenthesis, IParams, parseExpression, performResidualOperations } from "./services";

/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 *  via method add addNewOperation
 * @returns {number} result of evaluation
 */
class Calculator implements ICalculator {
  private operations: Map<string, Operation> = new Map();
  
  constructor() {
    // initialize with some basics operaions
    defaultOperations.forEach((operation) => this.operations.set(operation.symbol, operation));
  }

  /**
   * @description adds new operation to the class
   * @param {Operation} operation operation being added
   */
  addNewOperation(operation: Operation): void {
    if (this.operations.has(operation.symbol)) throw new Error(`Operation "${operation.symbol} already exists`);

    this.operations.set(operation.symbol, operation);
  }

  evaluate(expression: string): number {
    // get all the operation symbols, except function names
    const operationSymbols = Array.from(this.operations.keys()).filter((operation) => operation.length === 1);
    const tokens = parseExpression(expression, operationSymbols);

    const numberStack: number[] = [];
    const operatorStack: string[] = [];

    const params: IParams = {
      operatorStack,
      numberStack,
      getOperation: this.getOperation.bind(this),
      symbol: "",
      operation: undefined,
    };

    tokens.forEach((token, index) => {
      if (!isNaN(token as number)) return numberStack.push(Number(token));

      params.symbol = token as string;
      if (token === Operations.LEFT_PARENTHESIS || token === Operations.RIGHT_PARENTHESIS)
        return handleParenthesis(params);

      params.operation = this.getOperation(token as string);
      if (params.operation) return evaluateExpression(params);

      throw new Error(`Invalid character ${token} at position ${index}`);
    });

    performResidualOperations(params);

    if (numberStack.length > 1) throw new Error("Invalid expression. Several operands left");

    return (numberStack.pop() as number) ?? 0;
  }

  /**
   *
   * @param {string} operationSymbol symbol that represents the operation
   * @returns operation if defined, otherwise undefined
   */
  private getOperation(operationSymbol: string): Operation | undefined {
    return this.operations.get(operationSymbol);
  }
}

export default Calculator;
