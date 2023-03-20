import Operation from "../Operation";
import { Operations } from "../config";
import Evaluator from ".";

export interface IParams {
  operatorStack: string[];
  numberStack: number[];
  getOperation: (symbol: string) => Operation | undefined;
  symbol: string | null;
  operation: Operation | undefined;
}

/**
 * @description takes last operation from operation stack and performs it
 * @returns {string} symbol of operation performed
 */
export function performLastOperation(params: IParams): string {
  const { operatorStack, numberStack, getOperation } = params;

  const lastOperationSymbol = operatorStack.pop() as string;
  const lastOperation = getOperation(lastOperationSymbol) as Operation;

  const result = performOperation({ ...params, operation: lastOperation });
  numberStack.push(result);
  return lastOperationSymbol;
}

/**
 * @description takes quantity of numbers needed to perform operation from
 * number stack and performs the operation via operation.operation method
 * @param {Operation} operation operation to perform
 * @returns {number} result of operation
 */
export function performOperation({ numberStack, operation }: IParams): number {
  const operands = [];

  for (let i = 0; i < operation!.evaluate.length; i++) {
    const number = numberStack.pop();

    if (isNaN(number as number)) throw new Error("Invalid expression");

    operands.push(number);
  }

  // reverse because operands come in reverse order
  return operation!.evaluate(...(operands.reverse() as number[]));
}

export function handleParenthesis(params: IParams) {
  let { symbol, operatorStack } = params;

  // just push to the operators stack and wait until closing parenthesis occurs
  if (symbol === Operations.LEFT_PARENTHESIS) {
    return operatorStack.push(symbol);
  }

  // perform all operations available in stack until opening parenthesis
  symbol = operatorStack[operatorStack.length - 1];

  try {
    while (symbol !== Operations.LEFT_PARENTHESIS) {
      performLastOperation(params);
      symbol = operatorStack[operatorStack.length - 1];
    }
  } catch (error) {
    throw new SyntaxError("Missing parenthesis");
  }

  operatorStack.pop();

  // if end of parenthesis and on top of operator stack is a function, then call it
  if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].length > 1) {
    performLastOperation(params);
  }
}

export function evaluateExpression(params: IParams) {
  const { operation, operatorStack, getOperation } = params;

  if (operatorStack.length === 0) {
    return operatorStack.push(operation!.symbol);
  }

  const prevOperation = getOperation(operatorStack[operatorStack.length - 1]) as Operation;

  if (operation!.precedence <= prevOperation.precedence) {
    performLastOperation(params);
  }

  operatorStack.push(operation!.symbol);
}

export function performResidualOperations(params: IParams) {
  const { operatorStack } = params;

  while (operatorStack.length > 0) {
    const symbol = performLastOperation(params);

    if (symbol === Operations.LEFT_PARENTHESIS) throw new Error("Extra parentheses");
  }
}

export function parseExpression(expression: string, operationsSymbols: string[]): (string | number)[] {
  const tokens = [];
  const regexRaw = `[${operationsSymbols.map((operation) => `\\${operation}`)}]`;
  const operationRegex = new RegExp(regexRaw);
  const functionRegex = /[a-zA-Z]/;
  let currentToken = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    if (char === " ") {
      continue;
    } else if (char === Operations.COMMA) {
      // support of function with multiple arguments like max(1,3)
      // just ignore commas and add values to number stack
      if (currentToken !== "") {
        tokens.push(currentToken);
      }

      currentToken = "";
    } else if (
      !isNaN(+char) ||
      char === Operations.DOT ||
      (char === Operations.SUBTRACTION && currentToken.length === 0)
    ) {
      // append digits and decimal points to current token
      currentToken += char;
    } else if (operationRegex.test(char)) {
      // push current token and operator to tokens array
      if (currentToken !== "") {
        tokens.push(currentToken);
        currentToken = "";
      }

      tokens.push(char);
    } else if (functionRegex.test(char)) {
      // parse function name and push to tokens array
      let functionName = char;
      i++;

      while (i < expression.length && functionRegex.test(expression.charAt(i))) {
        functionName += expression.charAt(i);
        i++;
      }

      tokens.push(functionName);
      i--;
    } else {
      throw new Error(`Invalid character '${char}' at position ${i}`);
    }
  }

  // push last token to array (if it exists)
  if (currentToken !== "") {
    tokens.push(currentToken);
  }

  // if first number is negative, combine minus operation and number
  if (tokens[0] === Operations.SUBTRACTION) {
    tokens.shift();
    tokens[0] = -tokens[0];
  }

  return tokens;
}

/**
 *
 * @param {string} operationSymbol symbol that represents the operation
 * @returns operation if defined, otherwise undefined
 */
export function getOperation(this: Evaluator, operationSymbol: string): Operation | undefined {
  return this.operations.get(operationSymbol);
}
