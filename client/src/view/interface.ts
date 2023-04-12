export default interface ICalculatorView {
  setExpression(expression: string): void;
  getExpression(): string;

  render(): void;
}
