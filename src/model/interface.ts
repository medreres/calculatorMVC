import { Operation } from "../lib/Calculator";

export default interface ICalculatorModel {
  expression: string;
  result: number | string;

  setExpression(expression: string): void;
  setResult(result: string): void;
  getResult(): string;
  calculate(): number | string;
  addNewOperation(operation: Operation): void;
}
