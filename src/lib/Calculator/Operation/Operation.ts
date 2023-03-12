import { IOperation } from "./interface";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  operation: Function;

  constructor(symbol: string, precedence: number, operation: Function) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.operation = operation;
  }
}

export default Operation;
