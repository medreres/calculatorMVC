export default interface ICalculatorModel {
  expression: string;
  result: number | string;

  setExpression(expression: string): void;
  setResult(result: string): void;
  getResult(): string;
  calculate(): number | string;
  // TODO
  // setObservers(observer: Observer): void;
}
