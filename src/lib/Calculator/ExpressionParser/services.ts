import Parser from ".";
import { Constants } from "../interfaces";
import { Notation } from "../Operation/interfaces";
import Operation from "../Operation/Operation";

export function getMostPrecedentOperator(this: Parser, operators: string[]): Operation {
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

export function evaluate(this: Parser, exp: string, op: Operation) {
  const regex = makeRegex(op, "g");
  const operands = regex
    .exec(exp)!
    .slice(1)
    .map((number) => +number);
  return op.evaluate(...operands);
}

export function updateRegex(this: Parser) {
  const operations = Array.from(this.operationsRaw.values());

  const regexRaw = `[${operations
    .filter((operation) => operation.symbol.length === 1)
    .map((operation) => `\\${operation.symbol}`)
    .join("")}](?=[^0-9]|$)`;

  this.operationsRegex = new RegExp(regexRaw, "g");
  this.isRegexUpdated = true;
}

// create regex for operation depending on its notation
export const numberRegex = `([\\+\\-]*\\d*\\.*\\d+[eE]?[\\+\\-]?\\d?\\.?\\d?)`;
export function makeRegex(op: Operation, option?: string) {
  let regexRaw;
  switch (op.notation) {
    case Notation.INFIX:
      regexRaw = `${numberRegex}\\s*${/\w/.test(op!.symbol) ? "" : `\\`}${op.symbol}\\s*${numberRegex}`;
      break;

    case Notation.PREFIX:
      // TODO len of symbol
      regexRaw = `${/\w/.test(op!.symbol) ? "" : `\\`}${op.symbol}\\s*${numberRegex}`;
      break;

    case Notation.POSTFIX:
      regexRaw = `${numberRegex}\\s*${/\w/.test(op!.symbol) ? "" : `\\`}${op.symbol}\\s*`;
      break;

    default:
      regexRaw = `${numberRegex}\\s*${/\w/.test(op!.symbol) ? "" : `\\`}${op.symbol}\\s*${numberRegex}`;
      break;
  }

  return new RegExp(regexRaw, option);
}

export function getAvailableConstants(this: Parser): Constants {
  const constants: Constants = {};

  Array.from(this.constants).forEach(([key, value]) => {
    constants[key] = value;
  });

  return constants;
}

export function parseOperations(this: Parser, exp: string): string[] {
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

export function getRegex(this: Parser): RegExp {
  // initialize regex lazily
  if (!this.isRegexUpdated) updateRegex.call(this);

  return this.operationsRegex as RegExp;
}
