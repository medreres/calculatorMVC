import { IObserver } from "@/shared";

export default interface ICalculatorView extends IObserver {
  setExpression(expression: string): void;
  getExpression(): string;

  render(): void;
}
