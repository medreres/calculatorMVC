import Operation from "./Operation";
import ICalculator from "./interface";
/**
 * @description  Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation, support extending with new operations via method
 * add addNewOperation
 * @returns {number} result of evaluation
 */
class Calculator implements ICalculator {
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
      new Operation("tan", 3, (a: number) => Math.tan(a)),
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
    if (this.operations.find((op) => op.symbol === operation.symbol))
      throw new Error(`Operation "${operation.symbol} already exists`);

    this.operations.push(operation);
  }

  #performLastOperation(): string {
    const lastOperationSymbol = this.operatorStack.pop() as string;
    const lastOperation = this.#getOperation(lastOperationSymbol) as Operation;

    if (lastOperationSymbol === "(") throw new Error("Invald expression");

    const result = this.#performOperation(lastOperation);
    this.numberStack.push(result);
    return lastOperationSymbol;
  }

  #performOperation(operation: Operation): number {
    const operands = [];

    for (let i = 0; i < operation.operation.length; i++) {
      const number = this.numberStack.pop();

      if (isNaN(number as number)) throw new Error("Invalid expression");

      operands.push(number);
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

    do {
      this.#performLastOperation();
      symbol = this.operatorStack[this.operatorStack.length - 1];
    } while (symbol !== "(");

    this.operatorStack.pop();
  }
  #evaluateExpression(operation: Operation) {
    if (this.operatorStack.length === 0) {
      return this.operatorStack.push(operation.symbol);
    }
    // const currentOperation = this.#getOperation(operation) as Operation;
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

  #parseExpression(expr: string) {
    const tokens = [];
    let currentToken = "";
    const regexRaw = `[${this.operations
      .filter((operation) => operation.symbol.length === 1)
      .map((operation) => `\\${operation.symbol}`)}]`;
    const regex = new RegExp(regexRaw);

    // const tokens = [];
    // let currentToken = "";

    for (let i = 0; i < expr.length; i++) {
      const char = expr.charAt(i);

      if (char === " ") {
        // ignore whitespace
        continue;
      } else if (/\d/.test(char) || char === "." || (char === "-" && currentToken.length === 0)) {
        // append digits and decimal points to current token
        currentToken += char;
      } else if (regex.test(char)) {
        // push current token and operator to tokens array
        if (currentToken !== "") {
          tokens.push(currentToken);
          currentToken = "";
        }
        tokens.push(char);
      } else if (/[a-zA-Z]/.test(char)) {
        // parse function name and push to tokens array
        let functionName = char;
        i++;

        while (i < expr.length && /[a-zA-Z]/.test(expr.charAt(i))) {
          functionName += expr.charAt(i);
          i++;
        }

        if (currentToken !== "") {
          tokens.push(currentToken);
          currentToken = "";
        }

        tokens.push(functionName);
        i--;
      } else if (char === "-" && (i === 0 || /[^\d\.]/.test(expr.charAt(i - 1)))) {
        // handle negative numbers
        currentToken = "-";
      } else {
        // invalid character
        throw new Error(`Invalid character '${char}' at position ${i}`);
      }
    }

    // push last token to array (if it exists)
    if (currentToken !== "") {
      tokens.push(currentToken);
    }

    if (tokens[0] === "-") {
      tokens.shift();
      tokens[0] = -tokens[0];
    }

    return tokens;
  }

  evaluate(expression: string): number {
    const tokens = this.#parseExpression(expression);

    tokens.forEach((ch: any, index: number) => {
      if (!isNaN(+ch)) return this.numberStack.push(Number(ch));

      // ? can be better?
      // perform same comparision twice
      if (ch === "(" || ch === ")") return this.#handleParentesis(ch);

      const operation = this.#getOperation(ch);
      if (operation) return this.#evaluateExpression(operation);

      throw new Error(`Invalid character ${ch} at position ${index}`);
    });

    this.#performResidualOperations();

    return (this.numberStack.pop() as number) ?? 0;
  }
}

export default Calculator;
