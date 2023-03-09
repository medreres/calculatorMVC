import Operation from "../Operation/Operation";
import { ICalculator } from "./interface";
import { parseExpression } from "./utils";
import operations from "./operations.config";

/**
 * @description Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations
 *  via method add addNewOperation
 * @returns {number} result of evaluation
 */
class Calculator implements ICalculator {
  private operations: Map<string, Operation>;
  private numberStack: number[] = [];
  private operatorStack: string[] = [];

  constructor() {
    // initialize with some basics operaions
    this.operations = new Map();
    operations.forEach((operation) => this.operations.set(operation.symbol, operation));
  }

  /**
   * @description adds new operation to the class
   * @param {Operation} operation operation being added
   */
  addNewOperation(operation: Operation): void {
    if (this.operations.has(operation.symbol)) throw new Error(`Operation "${operation.symbol} already exists`);

    this.operations.set(operation.symbol, operation);
  }

  // getAllOperations() {
  //   return { ...this.operations.entries() };
  // }

  evaluate(expression: string): number {
    // get all the operation symbols, except function names
    const operationSymbols = Array.from(this.operations.keys()).filter((operation) => operation.length === 1);
    const tokens = parseExpression(expression, operationSymbols);

    tokens.forEach((token, index) => {
      if (!isNaN(token as number)) return this.numberStack.push(Number(token));

      if (token === "(" || token === ")") return this.#handleParenthesis(token);

      const operation = this.#getOperation(token as string);
      if (operation) return this.#evaluateExpression(operation);

      throw new Error(`Invalid character ${token} at position ${index}`);
    });

    this.#performResidualOperations();

    return (this.numberStack.pop() as number) ?? 0;
  }

  /**
   *
   * @param {string} operationSymbol symbol that represents the operation
   * @returns operation if defined, otherwise undefined
   */
  #getOperation(operationSymbol: string): Operation | undefined {
    return this.operations.get(operationSymbol);
  }

  /**
   * @description takes last operation from operation stack and performs it
   * @returns symbol of operation performed
   */
  #performLastOperation(): string {
    const lastOperationSymbol = this.operatorStack.pop() as string;
    const lastOperation = this.#getOperation(lastOperationSymbol) as Operation;

    if (lastOperationSymbol === "(") throw new Error("Invalid expression");

    const result = this.#performOperation(lastOperation);
    this.numberStack.push(result);
    return lastOperationSymbol;
  }

  /**
   * @description takes quantity of numbers needed to perform operation from
   * number stack and performs the operation via operation.operation method
   * @param {Operation} operation operation to perform
   * @returns result of operation
   */
  #performOperation(operation: Operation): number {
    const operands = [];

    for (let i = 0; i < operation.operation.length; i++) {
      const number = this.numberStack.pop();

      if (isNaN(number as number)) throw new Error("Invalid expression");

      operands.push(number);
    }

    // reverse because operands come in reverse order
    return operation.operation(...(operands.reverse() as number[]));
  }

  #handleParenthesis(symbol: string) {
    if (symbol === "(") {
      // just push to the operators stack and wait until closing parenthesis occurs
      return this.operatorStack.push(symbol);
    }

    // perform all operations available in stack until opening parenthesis
    do {
      this.#performLastOperation();
      // take remaining operation and check if its parenthesis
      symbol = this.operatorStack[this.operatorStack.length - 1];
    } while (symbol !== "(");

    this.operatorStack.pop();
  }

  #evaluateExpression(operation: Operation) {
    if (this.operatorStack.length === 0) {
      return this.operatorStack.push(operation.symbol);
    }

    const prevOperation = this.#getOperation(this.operatorStack[this.operatorStack.length - 1]) as Operation;

    if (operation.precedence <= prevOperation.precedence) {
      this.#performLastOperation();
    }

    this.operatorStack.push(operation.symbol);
  }

  #performResidualOperations() {
    while (this.operatorStack.length > 0) {
      const symbol = this.operatorStack.pop();
      if (symbol === "(") throw new Error("Invalid expression");

      const operator = this.#getOperation(symbol as string) as Operation;
      const result = this.#performOperation(operator);
      this.numberStack.push(result);
    }
  }
}

export default Calculator;
