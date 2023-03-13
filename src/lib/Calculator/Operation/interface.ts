export interface IOperation {
  symbol: string;
  precedence: number;

  operation: Function;
}
