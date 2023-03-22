import RegexEvaluator from ".";
import Operation from "../../Operation";
import { Notation } from "../../Operation/interfaces";
import { Operations } from "../config";
import { ParsedOperation } from "../ExpressionParser/services";

export function calculate(this: RegexEvaluator, expression: string): string {
  const parenthesesRegexRaw = `\\${Operations.LEFT_PARENTHESIS}(.*)\\${Operations.RIGHT_PARENTHESIS}`;
  const parenthesesRegex = new RegExp(parenthesesRegexRaw);
  const group = expression.match(parenthesesRegex);

  // if parenthesis are found, start inner loop
  if (group) {
    const calculatedGroup = calculate.call(this, group[1]);
    expression = expression.replace(parenthesesRegex, calculatedGroup);
  }

  // parse all operations and perform them one by one, following their precedence

  let operators = this.parser.parseOperations(expression);
  if (operators.length > 0) {
    const { operation, index } = getLeastPrecedentOperator.call(this, operators);

    // left and right hand sides of operation
    let lhs: string | undefined;
    let rhs: string | undefined;

    switch (operation.notation) {
      case Notation.INFIX:
        // split string in two at the operations' position
        [lhs, rhs] = [expression.slice(0, index), expression.slice(index + operation.symbol.length)];
        lhs = calculate.call(this, lhs);
        rhs = calculate.call(this, rhs);
        return operation.evaluate(+lhs, +rhs);

      case Notation.PREFIX:
        // take only right part
        [lhs, rhs] = [expression.slice(0, index), expression.slice(index + operation.symbol.length)];
        // rhs = calculate.call(this, rhs);
        rhs = operation.evaluate(+rhs);
        expression = calculate.call(this, lhs + rhs);
        break;

      case Notation.POSTFIX:
        // take only left part
        lhs = expression.slice(0, index);
        lhs = calculate.call(this, lhs);
        return operation.evaluate(+lhs);
    }
  }

  return expression;
}

export function getLeastPrecedentOperator(
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
