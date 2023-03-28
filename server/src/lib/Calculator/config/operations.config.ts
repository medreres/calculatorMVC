import { Notation } from "../utils/Operation";

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
}

export const operations: IOperation[] = [
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
interface IOperation {
  symbol: string;
  precedence: number;
  notation: Notation;
  evaluate: Function;
}
