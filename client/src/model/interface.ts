import { Operation } from "../lib/Calculator";

export default interface ICalculatorModel {
  setExpression(expression: string): void;
  getExpression(): string;

  setResult(result: number | string): void;
  getResult(): number | string;

  calculate(): number | string;

  addNewOperation(operation: Operation): void;
  addNewConstant(name: string, value: number): void;
}
