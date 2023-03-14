export interface IOperation {
  symbol: string;
  precedence: number;

  evaluate: Function;
}
