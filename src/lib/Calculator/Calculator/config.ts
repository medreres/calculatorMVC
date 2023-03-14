import Operation from "../Operation/Operation";

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

export const defaultOperations =  [
  new Operation(Operations.ADDITION, 1, (a: number, b: number) => a + b),
  new Operation(Operations.SUBTRACTION, 1, (a: number, b: number) => a - b),
  new Operation(Operations.MULTIPLICATION, 2, (a: number, b: number) => a * b),
  new Operation(Operations.DIVISION, 2, (a: number, b: number) => a / b),
  new Operation(Operations.EXPONENTIATION, 3, (a: number, b: number) => a ** b),
  new Operation(Operations.LEFT_PARENTHESIS, 0, () => 0),
  new Operation(Operations.RIGHT_PARENTHESIS, 0, () => 0),
];
