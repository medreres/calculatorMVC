import RegexEvaluator from ".";
import Operation from "../../Operation";
import { Operations } from "../config";
import { ParsedOperation } from "../ExpressionParser/services";

export function evaluate(this: RegexEvaluator, expression: string): string {
  const parenthesesRegexRaw = `\\${Operations.LEFT_PARENTHESIS}(.*)\\${Operations.RIGHT_PARENTHESIS}`;
  const parenthesesRegex = new RegExp(parenthesesRegexRaw);
  const group = expression.match(parenthesesRegex);

  // if parenthesis are found, start inner loop
  if (group) {
    const evaluatedGroup = evaluate.call(this, group[1]);
    expression = expression.replace(parenthesesRegex, evaluatedGroup);
  }

  // parse all operations and perform them one by one, following their precedence
  // TODO Can we search operators along with their operands?

  let operators = this.parser.parseOperations(expression);
  // console.log(operators);
  if (operators.length > 0) {
    const { operation, index } = getLeastPrecedentOperator.call(this, operators);
    // TODO return index in string
    let [lhs, rhs] = [expression.slice(0, index), expression.slice(index + operation.symbol.length)];
    lhs = evaluate.call(this, lhs);
    rhs = evaluate.call(this, rhs);
    return operation.evaluate(+lhs, +rhs);
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
