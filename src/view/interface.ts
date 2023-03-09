export default interface ICalculatorView {
  setExpression(expression: string): void;
  getExpression(): string;
  setResult(result: string): void;
  // setObservers(observer: Observer): void;
}
