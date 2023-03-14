import { IOperation } from "./interface";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  evaluate: Function;

  constructor(symbol: string, precedence: number, evaluate: Function) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.evaluate = evaluate;
  }
}

export default Operation;
