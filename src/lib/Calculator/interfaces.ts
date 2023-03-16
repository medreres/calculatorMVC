import Operation from "./Operation/Operation";

export interface ICalculator {
  // main functionality
  evaluate(expression: string): number;

  // operations
  addNewOperation(operation: Operation): ICalculator;
  getAvailableOperations(): Operation[];

  // constants
  addNewConstant(key: string, value: number): ICalculator;
}

export interface Constants {
  [key: string]: number;
}
