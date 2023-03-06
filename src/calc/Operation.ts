interface Operation {
  symbol: string;
  precedence: number;
  operation: Function;
}
class Operation {
  constructor(symbol: string, precedence: number, operation: Function) {
    this.symbol = symbol;
    this.precedence = precedence;
    this.operation = operation;
  }
}

export default Operation;
