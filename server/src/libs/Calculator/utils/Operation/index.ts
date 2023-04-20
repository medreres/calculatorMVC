import { IOperation, Notation } from "./interfaces";

class Operation implements IOperation {
  symbol: string;
  precedence: number;
  evaluate: Function;
  notation: Notation;

  constructor({ symbol, precedence, notation, evaluate }: IOperation) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.evaluate = evaluate;
    this.notation = notation;
  }
}

export default Operation;
export { IOperation, Notation };
