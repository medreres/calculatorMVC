import Observer from "../lib/Observer";

export default abstract class CalculatorViewBaseClass {
  abstract setExpression(expression: string): void;
  abstract getExpression(): string;
  abstract setResult(result: string): void;
  abstract setObservers(observer: Observer): void;
}
