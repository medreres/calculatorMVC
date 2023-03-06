import operators, { IOperator } from "./operators";

const performResidualOperations = (numberStack: number[], operatorStack: string[]) => {
  while (operatorStack.length > 0) {
    const symbol = operatorStack.pop();
    if (symbol === "(") throw new Error("Invalid expression");

    const operator = operators[symbol as string];
    const result = performOperation(numberStack, operator);
    numberStack.push(result);
  }
};
const performLastOperation = (numberStack: number[], operatorStack: string[]): string => {
  const lastOperationSymbol = operatorStack.pop() as string;
  const lastOperation = operators[lastOperationSymbol];
  const result = performOperation(numberStack, lastOperation);
  numberStack.push(result);
  return lastOperationSymbol;
};
export const performOperation = (numberStack: number[], operator: IOperator) => {
  const operands = [];

  for (let i = 0; i < operator.operands; i++) {
    operands.push(numberStack.pop());
  }

  // reverse beacuse operands come in reverse order
  return operator.operate(...(operands.reverse() as number[]));
};

const handleParentesis = (symbol: string, numberStack: number[], operatorStack: string[]) => {
  if (symbol === "(") {
    // just push to the operators stack and wait unitl closing parenthesis occurs
    operatorStack.push(symbol);
  } else if (symbol === ")") {
    // perform all operations available in stack unitl opening parenthesis
    let operator;
    do {
      performLastOperation(numberStack, operatorStack);
      operator = operatorStack.pop();
    } while (operator !== "(");

    // let operator = operatorStack.pop();
    // while (operator !== "(") {
    //   const result = performOperation(numberStack, operators[operator as keyof typeof operators]);
    //   numberStack.push(result);
    //   operator = operatorStack.pop();
    // }
  }
};

const evaluate = (ch: string, operatorStack: string[], numberStack: number[]) => {
  if (operatorStack.length === 0) {
    return operatorStack.push(ch);
  }
  const currentOperation = operators[ch];
  const prevOperation = operators[operatorStack[operatorStack.length - 1]];

  if (currentOperation.priority < prevOperation.priority) {
    performLastOperation(numberStack, operatorStack);
  }

  operatorStack.push(ch);
};

// check if operation symbol is defined in operators object
const isValidOperation = (ch: string) => !!operators[ch];

/**
 * @description  Shunting Yard Algorithm, parses expression, splits it into operands
 * and operators and returns result of evaluation
 * @param expression
 * @returns {number} result of evaluation
 */
export default function (expression: string): number {
  const numberStack: number[] = [];
  const operatorStack: string[] = [];

  const symbols = expression.split(" ");

  symbols.forEach((ch) => {
    if (!isNaN(+ch)) return numberStack.push(Number(ch));
    // ? can be better?
    else if (ch === "(" || ch === ")") return handleParentesis(ch, numberStack, operatorStack);
    else if (isValidOperation(ch)) return evaluate(ch, operatorStack, numberStack);
    else throw new Error("Invalid operator");
  });

  performResidualOperations(numberStack, operatorStack);

  return numberStack[0];
}

// const exp = "5 ! + 20";
// console.log(evaluate(exp));
