import Operation from "./Operation";

interface ExpressionEvaluator {
  expression: string;
}
/**
 * @description  Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations via method
 * add addNewOperation
 * @returns {number} result of evaluation
 */
class ExpressionEvaluator {
  private operations: Operation[];
  private numberStack: number[] = [];
  private operatorStack: string[] = [];

  constructor() {
    this.operations = [
      new Operation("+", 1, (a: number, b: number) => a + b),
      new Operation("-", 1, (a: number, b: number) => a - b),
      new Operation("*", 2, (a: number, b: number) => a * b),
      new Operation("/", 2, (a: number, b: number) => a / b),
      new Operation("^", 3, (a: number, b: number) => a ** b),
      new Operation("lg", 3, (a: number) => Math.log10(a)),
      new Operation("ln", 3, (a: number) => Math.log(a)),
      new Operation("exp", 3, (a: number) => Math.exp(a)),
      new Operation("extanp", 3, (a: number) => Math.tan(a)),
      new Operation("(", 0, () => 0),
      new Operation(")", 0, () => 0),
    ];
  }

  /**
   *
   * @param {string} operationSymbol symbol that represents the operation
   * @returns operation if defined, otherwise undefined
   */
  #getOperation(operationSymbol: string): Operation | undefined {
    return this.operations.find((operation) => operation.symbol === operationSymbol);
  }

  /**
   * @description adds new operation to the class
   * @param {Operation} operation  add
   */
  addNewOperation(operation: Operation) {
    this.operations.push(operation);
  }

  #performLastOperation(): string {
    const lastOperationSymbol = this.operatorStack.pop() as string;
    const lastOperation = this.#getOperation(lastOperationSymbol) as Operation;

    const result = this.#performOperation(lastOperation);
    this.numberStack.push(result);
    return lastOperationSymbol;
  }

  #performOperation(operation: Operation): number {
    const operands = [];

    for (let i = 0; i < operation.operation.length; i++) {
      operands.push(this.numberStack.pop());
    }

    // reverse beacuse operands come in reverse order
    return operation.operation(...(operands.reverse() as number[]));
  }

  #handleParentesis(symbol: string) {
    if (symbol === "(") {
      // just push to the operators stack and wait unitl closing parenthesis occurs
      return this.operatorStack.push(symbol);
    }

    // perform all operations available in stack unitl opening parenthesis
    // let operator;
    do {
      this.#performLastOperation();
      symbol = this.operatorStack.pop() as string;
      console.log(symbol);
    } while (symbol !== "(");

    // let operator = operatorStack.pop();
    // while (operator !== "(") {
    //   const result = performOperation(numberStack, operators[operator as keyof typeof operators]);
    //   numberStack.push(result);
    //   operator = operatorStack.pop();
    // }
  }
  #evaluateExpression(operation: Operation) {
    if (this.operatorStack.length === 0) {
      return this.operatorStack.push(operation.symbol);
    }
    // const currentOperation = this.#getOperation(operation) as Operation;
    const prevOperation = this.#getOperation(this.operatorStack[this.operatorStack.length - 1]) as Operation;

    if (operation.precedence < prevOperation.precedence) {
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

  evaluate(expression: string): number {
    // TODO create parses to make evalute function more flexible
    // TODO add implicit multiplication operation
    const tokens = expression.split(' ')

    tokens.forEach((ch) => {
      if (!isNaN(+ch)) return this.numberStack.push(Number(ch));

      // ? can be better?
      // perform same comparision twice
      if (ch === "(" || ch === ")") return this.#handleParentesis(ch);

      const operation = this.#getOperation(ch);
      if (operation) return this.#evaluateExpression(operation);

      throw new Error("Invalid expression");
    });

    this.#performResidualOperations();

    return this.numberStack.pop() as number;
  }
}

export default ExpressionEvaluator;
