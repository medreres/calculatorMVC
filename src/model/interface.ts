import { Operation } from "../lib/Calculator";

export default interface ICalculatorModel {
  setExpression(expression: string): void;
  getExpression(): string;
  setResult(result: string): void;
  getResult(): string;
  calculate(): number | string;
  addNewOperation(operation: Operation): void;
  getAvailableOperations(): Operation[];
}
