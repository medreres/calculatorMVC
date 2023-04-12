import { IOperation } from "@/shared";

export default interface ICalculatorModel {
  setExpression(expression: string): void;
  getExpression(): string;

  calculate(): void;

  addHistory(operation: IOperation): boolean;
  getHistory(): IOperation[];
}
