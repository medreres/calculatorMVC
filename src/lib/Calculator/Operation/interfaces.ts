export interface IOperation {
  symbol: string;
  precedence: number;
  notation: Notation;

  evaluate: Function;
}

export enum Notation {
  POSTFIX = "Postfix",
  PREFIX = "Prefix",
  INFIX = "INFIX",
}
