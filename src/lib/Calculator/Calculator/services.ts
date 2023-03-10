import Operation from "../Operation/Operation";

export interface IParams {
  operatorStack: string[];
  numberStack: number[];
  getOperation: (symbol: string) => Operation | undefined;
  symbol: string | null;
  operation: Operation | undefined;
}

/**
 * @description takes last operation from operation stack and performs it
 * @returns symbol of operation performed
 */
export function performLastOperation(params: IParams): string {
  const { operatorStack, numberStack, getOperation } = params;
  const lastOperationSymbol = operatorStack.pop() as string;
  const lastOperation = getOperation(lastOperationSymbol) as Operation;

  // if (lastOperationSymbol === "(") throw new Error("Invalid expression");

  const result = performOperation({ ...params, operation: lastOperation });
  numberStack.push(result);
  return lastOperationSymbol;
}

/**
 * @description takes quantity of numbers needed to perform operation from
 * number stack and performs the operation via operation.operation method
 * @param {Operation} operation operation to perform
 * @returns result of operation
 */
export function performOperation({ numberStack, operation }: IParams): number {
  const operands = [];

  for (let i = 0; i < operation!.operation.length; i++) {
    const number = numberStack.pop();

    if (isNaN(number as number)) throw new Error("Invalid expression");

    operands.push(number);
  }

  // reverse because operands come in reverse order
  return operation!.operation(...(operands.reverse() as number[]));
}

export function handleParenthesis(params: IParams) {
  let { symbol, operatorStack } = params;

  if (symbol === "(") {
    // just push to the operators stack and wait until closing parenthesis occurs
    return operatorStack.push(symbol);
  }

  // perform all operations available in stack until opening parenthesis
  symbol = operatorStack[operatorStack.length - 1];
  // if (symbol === '(') throw new Error(`Invalid expression`)
  while (symbol !== "(") {
    performLastOperation(params);
    symbol = operatorStack[operatorStack.length - 1];

    // take remaining operation and check if its parenthesis
    // symbol = this.operatorStack[this.operatorStack.length - 1];
  }
  // while (symbol !== "(");

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
  const { operatorStack, numberStack, getOperation } = params;
  while (operatorStack.length > 0) {
    const symbol = operatorStack.pop();
    if (symbol === "(") throw new Error("Invalid expression");

    const operation = getOperation(symbol as string) as Operation;
    const result = performOperation({ ...params, operation });
    numberStack.push(result);
  }
}
