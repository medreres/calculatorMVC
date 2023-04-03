import Operation, { Notation } from "../utils/Operation";

export enum Operations {
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
  EXPONENTIATION = "^",
  FACTORIAL = "!",
  LEFT_PARENTHESIS = "(",
  RIGHT_PARENTHESIS = ")",
  DOT = ".",
  COS = "cos",
  SIN = "sin",
  TAN = "tan",
  MODULA = "%",
  LN = "ln",
  SQRT = "√",
}

interface IOperation {
  symbol: string;
  precedence: number;
  notation: Notation;
  evaluate: Function;
}
const operations: IOperation[] = [
  {
    symbol: Operations.LEFT_PARENTHESIS,
    precedence: 0,
    notation: Notation.PREFIX,
    evaluate: () => 0,
  },
  {
    symbol: Operations.RIGHT_PARENTHESIS,
    precedence: 0,
    notation: Notation.POSTFIX,
    evaluate: () => 0,
  },

  {
    symbol: Operations.ADDITION,
    precedence: 1,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a + b,
  },
  {
    symbol: Operations.SUBTRACTION,
    precedence: 1,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a - b,
  },
  {
    symbol: Operations.MULTIPLICATION,
    precedence: 2,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a * b,
  },
  {
    symbol: Operations.DIVISION,
    precedence: 2,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a / b,
  },
  {
    symbol: Operations.EXPONENTIATION,
    precedence: 3,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a ** b,
  },
  {
    symbol: Operations.SIN,
    precedence: 3,
    notation: Notation.PREFIX,
    evaluate: (a: number) => Math.sin(a),
  },
  {
    symbol: Operations.COS,
    precedence: 3,
    notation: Notation.PREFIX,
    evaluate: (a: number) => Math.cos(a),
  },
  {
    symbol: Operations.TAN,
    precedence: 3,
    notation: Notation.PREFIX,
    evaluate: (a: number) => Math.tan(a),
  },
  {
    symbol: Operations.MODULA,
    precedence: 3,
    notation: Notation.INFIX,
    evaluate: (a: number, b: number) => a % b,
  },
  {
    symbol: Operations.SQRT,
    precedence: 3,
    notation: Notation.PREFIX,
    evaluate: (a: number) => Math.sqrt(a),
  },
  {
    symbol: Operations.LN,
    precedence: 3,
    notation: Notation.PREFIX,
    evaluate: (a: number) => Math.log(a),
  },
  {
    symbol: Operations.FACTORIAL,
    precedence: 4,
    notation: Notation.POSTFIX,
    evaluate: (a: number) => {
      let acc = 1;
      for (let i = 1; i <= a; i++) {
        acc *= i;
      }
      return acc;
    },
  },
];

export const defaultOperations = operations.map((operation) => new Operation(operation));
