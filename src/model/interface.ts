import Observer from "../lib/Observer";

export default abstract class CalculatorModelBaseClass {
  expression: string;
  result: number | string;

  constructor() {
    this.expression = "";
    this.result = "";
  }

  setExpression(expression: string) {
    this.expression = expression;
  }

  setResult(result: number | string) {
    this.result = result;
  }

  abstract calculate(): void;
  abstract setObservers(observer: Observer): void;
}
