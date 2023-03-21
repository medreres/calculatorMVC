import { IOperation, Notation } from "./interfaces";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  evaluate: Function;
  notation: Notation;

  constructor(symbol: string, precedence: number, notation: Notation, evaluate: Function) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.evaluate = evaluate;
    this.notation = notation;
  }
}

export default Operation;
