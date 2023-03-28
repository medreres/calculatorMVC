import Operation from "../utils/Operation";
import { Notation } from "../utils/Operation/interfaces";

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
  COS = 'cos'
}

export const defaultConstants = {
  PI: Math.PI,
  E: Math.E,
};

// TODO better config
export const defaultOperations = [
  new Operation(Operations.ADDITION, 1, Notation.INFIX, (a: number, b: number) => a + b),
  new Operation(Operations.SUBTRACTION, 1, Notation.INFIX, (a: number, b: number) => a - b),
  new Operation(Operations.MULTIPLICATION, 2, Notation.INFIX, (a: number, b: number) => a * b),
  new Operation(Operations.DIVISION, 2, Notation.INFIX, (a: number, b: number) => a / b),
  new Operation(Operations.EXPONENTIATION, 3, Notation.INFIX, (a: number, b: number) => a ** b),
  new Operation(Operations.FACTORIAL, 4, Notation.POSTFIX, (a: number) => {
    let acc = 1;
    for (let i = 1; i <= a; i++) {
      acc *= i;
    }
    return acc;
  }),
  new Operation(Operations.COS, 3, Notation.PREFIX, (a: number) => Math.cos(a)),
];
