import Observer from "../lib/observer";

export default abstract class ICalculatorModel {
  expression: string;
  result: number | string;

  constructor() {
    this.expression = "";
    this.result = "";
  }

  setExpression(expression: string) {
    this.expression = expression;
  }

  setResult(result: number) {
    this.result = result;
  }

  abstract calculate(): void;
  abstract setObservers(observer: Observer): void;
}
