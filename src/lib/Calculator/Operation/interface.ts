export interface IOperation {
  symbol: string;
  precedence: number;

  operate: Function;
}
