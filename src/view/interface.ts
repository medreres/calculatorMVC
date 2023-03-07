import Observer from "../lib/observer";

export default abstract class ICalculatorView {
  abstract setExpression(expression: string): void;
  abstract getExpression(): string;
  abstract setObservers(observer: Observer): void;
}
