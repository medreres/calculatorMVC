import Operation from "../Operation/Operation";

export default [
  new Operation("+", 1, (a: number, b: number) => a + b),
  new Operation("-", 1, (a: number, b: number) => a - b),
  new Operation("*", 2, (a: number, b: number) => a * b),
  new Operation("/", 2, (a: number, b: number) => a / b),
  new Operation("^", 3, (a: number, b: number) => a ** b),
  new Operation("(", 0, () => 0),
  new Operation(")", 0, () => 0),
];
