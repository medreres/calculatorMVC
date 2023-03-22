import Operation from "../../Operation";
import ExpressionParser from ".";
import { Constants } from "../interfaces";
import { Notation } from "../../Operation/interfaces";

export interface ParsedOperation {
  operationSymbol: string;
  operationIndex: number;
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

  const operationRegexRaw = operations
    .filter((operation) => operation.symbol.length === 1)
    .map((operation) => {
      const regexRaw = `\\${operation.symbol}`;
      return regexRaw;
    })
    .join("");

  const singleArgumentsOperations = operations
    .filter((operation) => operation.evaluate.length === 1)
    .map((operation) => {
      const regexRaw = `\\${operation.symbol}`;
      return regexRaw;
    })
    .join("");

  const regexRaw = `(?<=[0-9]|[${singleArgumentsOperations}]|\\s)[${operationRegexRaw}](?=[0-9]|[^0-9]|\s|$)`;

  this.operationsRegex = new RegExp(regexRaw, "g");
  this.isRegexUpdated = true;
}

// export const ExpressionParser.numberRegex = `([\\-]?\\d*\\.*\\d+[eE]?[\\+\\-]?\\d?\\.?\\d?)`;
/**
 * @description create regex for operation depending on its notation
 *  */
export function makeRegex(op: Operation, option?: string) {
  let regexRaw;
  const escapeSymbol = /\w/.test(op!.symbol) ? "" : `\\`;
  switch (op.notation) {
    case Notation.INFIX:
      regexRaw = `${ExpressionParser.numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*${ExpressionParser.numberRegex}`;
      break;

    case Notation.PREFIX:
      regexRaw = `${escapeSymbol}${op.symbol}\\s*${ExpressionParser.numberRegex}`;
      break;

    case Notation.POSTFIX:
      regexRaw = `${ExpressionParser.numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*`;
      break;

    default:
      regexRaw = `${ExpressionParser.numberRegex}\\s*${escapeSymbol}${op.symbol}\\s*${ExpressionParser.numberRegex}`;
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

export function getRegex(this: ExpressionParser): RegExp {
  // initialize regex lazily
  if (!this.isRegexUpdated) updateRegex.call(this);

  return this.operationsRegex as RegExp;
}

export function parseFunctions(this: ExpressionParser, expression: string): ParsedOperation[] {
  let result: ParsedOperation[] = [];

  const functionRegexRaw = `${this.getAvailableOperations()
    .filter((operation) => /\w/.test(operation.symbol))
    .map((operation) => `${operation.symbol}`)
    .join("|")}`;

  // if there are function operators, parse input for those
  if (functionRegexRaw) {
    const functionRegex = new RegExp(functionRegexRaw, "g");

    let match: any;
    while ((match = functionRegex.exec(expression)) != null) {
      result.push({
        operationIndex: match.index,
        operationSymbol: match[0],
      });
    }
  }

  return result;
}

export function parseSimpleOperations(this: ExpressionParser, expression: string): ParsedOperation[] {
  let result: ParsedOperation[] = [];
  const simpleOperationsRegex = getRegex.call(this);
  // const simpleOperations: string[] = simpleOperationsRegex.exec(expression) ?? [];
  let match: any;
  while ((match = simpleOperationsRegex.exec(expression)) != null) {
    result.push({
      operationIndex: match.index,
      operationSymbol: match[0],
    });
  }

  return result;
}
