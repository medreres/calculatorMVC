import { IOperation } from "./interface";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  operate: Function;

  constructor(symbol: string, precedence: number, operation: Function) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.operate = operation;
  }
}

export default Operation;
