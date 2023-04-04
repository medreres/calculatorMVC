import { IOperation } from "../shared/interfaces";

export default interface ICalculatorModel {
  setExpression(expression: string): void;
  getExpression(): string;

  calculate(): void;

  addHistory(operation: IOperation): boolean;
  getHistory(): IOperation[];
}
