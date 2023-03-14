import { IOperation } from "../Operation/interface";
import Operation from "../Operation/Operation";

export interface ICalculator {
  addNewOperation(operation: IOperation): void;
  evaluate(expression: string): number;
  getAvailableOperations() : Operation[];
}
