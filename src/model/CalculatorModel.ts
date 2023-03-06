import ExpressionEvaluator from "../lib/calc";
interface CalculatorModel {
  expression: string;
  result: number | string;
}
class CalculatorModel {
  private calculator = new ExpressionEvaluator();
  constructor() {
    this.expression = "";
    this.result = 0;
  }

  setExpression(expression: string) {
    this.expression = expression;
  }

  setResult(result: number) {
    this.result = result;
  }

  calculate() {
    try {
      this.result = this.calculator.evaluate(this.expression);
    } catch (error ) {
      this.result = error as any;
    }
  }
}

export default CalculatorModel;
