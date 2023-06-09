import Operation from "../Operation";
import ExpressionParser from ".";
import { Constants } from "../../interfaces";
import { Notation } from "../Operation/interfaces";
import { Operations } from "../../config";

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

  /**
   * ensures that those symbols to the left of operation being parsed are either numbers
   *  or whitespace, not unary operators
   * For example 5! - 10
   * Prevents from wrongly parsing negation as subtraction
   * For example 5 - -10
   * or
   * tan-5, which could be parsed as tan and subtraction
   */
  const unaryOperations = operations
    .filter((operation) => operation.evaluate.length === 1 && operation.symbol.length === 1)
    .map((operation) => {
      const regexRaw = `\\${operation.symbol}`;
      return regexRaw;
    })
    .join("");

  const regexRaw = `(?<=[0-9]|[${unaryOperations}]|\\s)[${operationRegexRaw}](?=[0-9]|[^0-9]|\s|$)`;

  this.operationsRegex = new RegExp(regexRaw, "g");
  this.isRegexUpdated = true;
}

/**
 * @description create regex for operation depending on its notation
 */
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
  let match: any;
  while ((match = simpleOperationsRegex.exec(expression)) != null) {
    result.push({
      operationIndex: match.index,
      operationSymbol: match[0],
    });
  }

  return result;
}

export function parseTokens(
  this: ExpressionParser,
  expression: string,
  operationsSymbols: string[]
): (string | number)[] {
  const tokens = [];
  const regexRaw = `[${operationsSymbols.map((operation) => `\\${operation}`)}]`;
  const operationRegex = new RegExp(regexRaw);
  const functionRegex = /[a-zA-Z]/;
  let currentToken = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    if (char === " ") {
      continue;
    } else if (
      !isNaN(+char) ||
      char === Operations.DOT ||
      (char === Operations.SUBTRACTION && currentToken.length === 0)
    ) {
      // append digits and decimal points to current token
      currentToken += char;
    } else if (operationRegex.test(char)) {
      // push current token and operator to tokens array
      if (currentToken !== "") {
        tokens.push(currentToken);
        currentToken = "";
      }

      tokens.push(char);
    } else if (functionRegex.test(char)) {
      // parse function name and push to tokens array
      let functionName = char;
      i++;

      while (i < expression.length && functionRegex.test(expression.charAt(i))) {
        functionName += expression.charAt(i);
        i++;
      }

      tokens.push(functionName);
      i--;
    } else {
      throw new Error(`Invalid character '${char}' at position ${i}`);
    }
  }

  // push last token to array (if it exists)
  if (currentToken !== "") {
    tokens.push(currentToken);
  }

  // if first number is negative, combine minus operation and number
  if (tokens[0] === Operations.SUBTRACTION && !isNaN(+tokens[1])) {
    tokens.shift();
    tokens[0] = -tokens[0];
  }

  return tokens;
}
