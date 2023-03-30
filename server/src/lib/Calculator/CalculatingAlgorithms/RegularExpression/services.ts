import RegularExpression from ".";
import { parenthesesGroupRegex } from "../../config";
import Operation, { Notation } from "../../utils/Operation";

export function evaluateParenthesesGroup(this: RegularExpression, expression: string) {
  let group: RegExpMatchArray | null;

  // if parenthesis are found, start inner loop
  while ((group = expression.match(parenthesesGroupRegex)) != null) {
    const calculatedGroup = calculate.call(this, group[1]);
    expression = expression.replace(parenthesesGroupRegex, calculatedGroup);
  }

  return expression;
}

export function calculate(this: RegularExpression, expression: string): string {
  // evaluate all parentheses groups
  expression = evaluateParenthesesGroup.call(this, expression);

  // get least precedent operation is such exist
  const leastPrecedentOperation = getLeastPrecedentOperation.call(this, expression);

  if (leastPrecedentOperation) {
    expression = performOperation.call(this, {
      operation: leastPrecedentOperation.operation,
      expression,
      operationIndexInString: leastPrecedentOperation.index,
    });
  }

  return expression;
}

interface IPerformOperation {
  expression: string;
  operation: Operation;
  operationIndexInString: number;
}
export function performOperation(
  this: RegularExpression,
  { expression, operation, operationIndexInString }: IPerformOperation
) {
  // left and right hand sides of operation
  let leftPart: string | undefined;
  let rightPart: string | undefined;

  switch (operation.notation) {
    case Notation.INFIX:
      // split string in two at the operations' position
      [leftPart, rightPart] = [
        expression.slice(0, operationIndexInString),
        expression.slice(operationIndexInString + operation.symbol.length),
      ];

      if (!leftPart || !rightPart) {
        // operands missing
        throw new Error("Invalid expression");
      }

      leftPart = calculate.call(this, leftPart);
      rightPart = calculate.call(this, rightPart);
      expression = operation.evaluate(+leftPart, +rightPart);
      break;

    case Notation.PREFIX:
      // take only right part
      [leftPart, rightPart] = [
        expression.slice(0, operationIndexInString),
        expression.slice(operationIndexInString + operation.symbol.length),
      ];
      // rightPart = calculate.call(this, rightPart);
      rightPart = operation.evaluate(+rightPart);
      expression = calculate.call(this, leftPart + rightPart);
      break;

    case Notation.POSTFIX:
      // take only left part
      leftPart = expression.slice(0, operationIndexInString);
      leftPart = calculate.call(this, leftPart);
      expression = operation.evaluate(+leftPart);
      break;
  }

  return expression;
}

interface formattedOperation {
  operation: Operation;
  index: number;
}
export function getLeastPrecedentOperation(
  this: RegularExpression,
  expression: string
): formattedOperation | undefined {
  const operationSymbols = this.parser.parseOperations(expression);

  if (operationSymbols.length === 0) return undefined;

  // set initial value
  let leastPrecedentOperation: formattedOperation = {
    operation: this.parser.getOperation(operationSymbols[0].operationSymbol) as Operation,
    index: 0,
  };

  for (const { operationIndex, operationSymbol } of operationSymbols) {
    const operation = this.parser.getOperation(operationSymbol);

    if (!operation) {
      throw new Error(`Invalid operation ${operationSymbol}`);
    }

    if (operation.precedence <= leastPrecedentOperation.operation.precedence) {
      leastPrecedentOperation = {
        operation: operation as Operation,
        index: operationIndex,
      };
    }
  }

  return leastPrecedentOperation;
}
