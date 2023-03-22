import Operation from "../Operation";
import ExpressionParser from ".";
import { Constants } from "../Calculator/interfaces";
import { Notation } from "../Operation/interfaces";
import { Operations } from "../Calculator/config";

export function getMostPrecedentOperator(this: ExpressionParser, operators: string[]): Operation {
  const mostPrecedentOperation = operators.reduce(
    (acc, symbol, index): any => {
      const currentOperation = this.getOperation(symbol.trim());
      if (currentOperation!.precedence > acc!.operation!.precedence) {
        return {
          index,
          operation: currentOperation,
        };
      }
      return acc;
    },
    {
      index: 0,
      operation: this.getOperation(operators[0].trim()),
    }
  );

  // remove that operation
  operators.splice(mostPrecedentOperation.index, 1);

  return mostPrecedentOperation.operation as Operation;
}

export function evaluate(this: ExpressionParser, expression: string): string {
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
  let operators;

  while ((operators = parseOperations.call(this, expression)).length > 0) {
    const operation = getMostPrecedentOperator.call(this, operators);
    const regex = makeRegex(operation);
    const replacement = performOperation.call(this, expression, operation) as string;

    expression = expression.replace(regex, replacement).trim();
  }

  return expression;
}

export function performOperation(this: ExpressionParser, exp: string, op: Operation) {
  const regex = makeRegex(op, "g");

  try {
    const operands = regex
      .exec(exp)!
      .slice(1)
      .map((number) => +number);
    return op.evaluate(...operands);
  } catch (error) {
    throw new SyntaxError("Invalid expression");
  }
}

export function updateRegex(this: ExpressionParser) {
  const operations = Array.from(this.operationsRaw.values());

  const regexRaw = `(?<=[0-9]|\\s)[${operations
    .filter((operation) => operation.symbol.length === 1)
    .map((operation) => `\\${operation.symbol}`)
    .join("")}](?=[0-9]|[^0-9]|\s|$)`;

  this.operationsRegex = new RegExp(regexRaw, "g");
  this.isRegexUpdated = true;
}

// create regex for operation depending on its notation
// export const numberRegex = `([\\-]?\\d*\\.*\\d+[eE]?[\\+\\-]?\\d?\\.?\\d?)`;
export const numberRegex = `([\\-]?\\d*\\.?\\d+(?:[Ee][\\+\\-]?\\d+)?)`;
export function makeRegex(op: Operation, option?: string) {
  let regexRaw;
  const escapeSymbol = /\w/.test(op!.symbol) ? "" : `\\`;
  switch (op.notation) {
    case Notation.INFIX:
      regexRaw = `${numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*${numberRegex}`;
      break;

    case Notation.PREFIX:
      regexRaw = `${escapeSymbol}${op.symbol}\\s*${numberRegex}`;
      break;

    case Notation.POSTFIX:
      regexRaw = `${numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*`;
      break;

    default:
      regexRaw = `${numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*${numberRegex}`;
      break;
  }

  return new RegExp(regexRaw, option);
}

export function getAvailableConstants(this: ExpressionParser): Constants {
  const constants: Constants = {};

  Array.from(this.constants).forEach(([key, value]) => {
    constants[key] = value;
  });

  return constants;
}

export function parseOperations(this: ExpressionParser, exp: string): string[] {
  let res: string[] = [];

  const functionRegexRaw = `${this.getAvailableOperations()
    .filter((operation) => /\w/.test(operation.symbol))
    .map((operation) => `${operation.symbol}`)
    .join("|")}`;

  // if there are function operators, parse input for those
  if (functionRegexRaw) {
    const functionRegex = new RegExp(functionRegexRaw, "g");
    const functions: string[] = exp.match(functionRegex) ?? [];
    res.push(...functions);
  }

  const simpleOperationsRegex = getRegex.call(this);
  const simpleOperations: string[] = exp.match(simpleOperationsRegex) ?? [];
  res.push(...simpleOperations);

  return res;
}

export function getRegex(this: ExpressionParser): RegExp {
  // initialize regex lazily
  if (!this.isRegexUpdated) updateRegex.call(this);

  return this.operationsRegex as RegExp;
}
