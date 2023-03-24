import RegexEvaluator from ".";
import Operation from "../../utils/Operation";
import { Notation } from "../../utils/Operation/interfaces";
import { Operations } from "../../config";

export function evaluateParenthesesGroup(this: RegexEvaluator, expression: string) {
  const parenthesesRegexRaw = new RegExp(
    `\\${Operations.LEFT_PARENTHESIS}(?!.*\\${Operations.LEFT_PARENTHESIS})([^${Operations.RIGHT_PARENTHESIS}]*)\\${Operations.RIGHT_PARENTHESIS}`
  );

  const parenthesesRegex = new RegExp(parenthesesRegexRaw);
  let group;

  // if parenthesis are found, start inner loop
  while ((group = expression.match(parenthesesRegex)) != null) {
    const calculatedGroup = calculate.call(this, group[1]);
    expression = expression.replace(parenthesesRegex, calculatedGroup);
  }

  return expression;
}

export function calculate(this: RegexEvaluator, expression: string): string {
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
  this: RegexEvaluator,
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
export function getLeastPrecedentOperation(this: RegexEvaluator, expression: string): formattedOperation | undefined {
  const operationSymbols = this.parser.getOperations(expression);

  if (operationSymbols.length === 0) return undefined;

  // set initial value
  let result: formattedOperation = {
    operation: this.parser.getOperation(operationSymbols[0].operationSymbol) as Operation,
    index: 0,
  };

  for (const { operationIndex, operationSymbol } of operationSymbols) {
    const operation = this.parser.getOperation(operationSymbol);

    if (operation!.precedence <= result.operation.precedence) {
      result = {
        operation: operation as Operation,
        index: operationIndex,
      };
    }
  }

  return result;
}
