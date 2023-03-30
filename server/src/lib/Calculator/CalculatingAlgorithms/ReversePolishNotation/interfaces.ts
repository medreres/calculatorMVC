import Operation from "../../utils/Operation";

export interface IParams {
  operatorStack: string[];
  numberStack: number[];
  getOperation: (symbol: string) => Operation | undefined;
  symbol: string | null;
  operation: Operation | undefined;
}
