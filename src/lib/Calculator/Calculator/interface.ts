import { IOperation } from "../Operation/interface";

export interface ICalculator {
  addNewOperation(operation: IOperation): void;
  evaluate(expression: string): number;
  // getAllOperations(): { [key: string]: IOperation };
}
