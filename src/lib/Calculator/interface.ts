
export default interface ICalculator {
  addNewOperation(operation: IOperation): void;
  evaluate(expression: string): number;
}


export interface IOperation {
  symbol: string;
  precedence: number;
  operation: Function;
}