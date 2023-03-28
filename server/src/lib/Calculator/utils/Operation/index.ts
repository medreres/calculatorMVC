import { IConstructor, IOperation, Notation } from "./interfaces";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  evaluate: Function;
  notation: Notation;

  constructor({ symbol, precedence, notation, evaluate }: IConstructor) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.evaluate = evaluate;
    this.notation = notation;
  }
}

export default Operation;
