import { Notation } from "./Operation/interfaces";
import Operation from "./Operation";

export enum Operations {
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
  EXPONENTIATION = "^",
  LEFT_PARENTHESIS = "(",
  RIGHT_PARENTHESIS = ")",
  COMMA = ",",
  DOT = ".",
}

export const defaultConstants = {
  PI: Math.PI,
  E: Math.E,
};

export const defaultOperations = [
  new Operation(Operations.ADDITION, 1, Notation.INFIX, (a: number, b: number) => a + b),
  new Operation(Operations.SUBTRACTION, 1, Notation.INFIX, (a: number, b: number) => a - b),
  new Operation(Operations.MULTIPLICATION, 2, Notation.INFIX, (a: number, b: number) => a * b),
  new Operation(Operations.DIVISION, 2, Notation.INFIX, (a: number, b: number) => a / b),
  new Operation(Operations.EXPONENTIATION, 3, Notation.INFIX, (a: number, b: number) => a ** b),
];
