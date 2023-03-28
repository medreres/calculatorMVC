import Operation from "../../utils/Operation";
import Evaluator from ".";
import { Operations } from "../../config";

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
  let { operation, operatorStack, getOperation } = params;

  if (operatorStack.length === 0) {
    return operatorStack.push(operation!.symbol);
  }

  let prevOperation = getOperation(operatorStack[operatorStack.length - 1]) as Operation;

  while (prevOperation && operation!.precedence <= prevOperation.precedence) {
    performLastOperation(params);
    prevOperation = getOperation(operatorStack[operatorStack.length - 1]) as Operation;
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


/**
 *
 * @param {string} operationSymbol symbol that represents the operation
 * @returns operation if defined, otherwise undefined
 */
export function getOperation(this: Evaluator, operationSymbol: string): Operation | undefined {
  return this.operations.get(operationSymbol);
}
