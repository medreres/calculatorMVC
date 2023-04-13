import { IOperation, IObserver } from "@/shared";

export default interface ICalculatorModel extends IObserver {
  setExpression(expression: string): void;
  getExpression(): string;

  calculate(): void;

  addHistory(operation: IOperation): boolean;
  getHistory(): IOperation[];
}
