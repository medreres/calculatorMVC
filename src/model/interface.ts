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
  getResult(): string {
    return this.result as string;
  }

  abstract calculate(): number | string;
  abstract setObservers(observer: Observer): void;
}
