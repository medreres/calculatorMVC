export { default as RegularExpression } from "./RegularExpression";
export { default as ReversePolishNotation } from "./ReversePolishNotation";

export interface ICalculatingAlgorithm {
  evaluate: (expression: string) => number;
}
