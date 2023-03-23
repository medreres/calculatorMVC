import RegexEvaluator from ".";
import Operation from "../../utils/Operation";
import { Notation } from "../../utils/Operation/interfaces";
import { Operations } from "../../config";
import { ParsedOperation } from "../../utils/ExpressionParser/services";

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

  // parse all operations and perform them one by one, following their precedence
  let operators = this.parser.getOperations(expression);
  if (operators.length > 0) {
    const { operation, index } = getLeastPrecedentOperation.call(this, operators);
    expression = performOperation.call(this, {
      operation,
      expression,
      operationIndexInString: index,
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

export function getLeastPrecedentOperation(
  this: RegexEvaluator,
  operators: ParsedOperation[]
): {
  operation: Operation;
  index: number;
} {
  const mostPrecedentOperation = operators.reduce(
    (acc, parsedOperation, index): any => {
      const { operationSymbol, operationIndex } = parsedOperation;
      const currentOperation = this.parser.getOperation(operationSymbol.trim());
      if (currentOperation!.precedence <= acc!.operation!.precedence) {
        return {
          arrIndex: index,
          index: operationIndex,
          operation: currentOperation,
        };
      }
      return acc;
    },
    {
      index: operators[0].operationIndex,
      operation: this.parser.getOperation(operators[0].operationSymbol.trim()) as Operation,
    }
  );

  // remove that operation
  operators.splice((mostPrecedentOperation as any).arrIndex, 1);

  return mostPrecedentOperation;
}
