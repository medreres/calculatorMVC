import Calc from "../../lib/Calculator";
import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
class CalculatorModel implements ICalculatorModel {
  private calculator = new Calc();
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

  calculate(): number | string {
    try {
      const result = this.calculator.evaluate(this.expression);
      this.setResult(result);
      return result;
    } catch (error) {
      const errorMsg: string = (error as any).message;
      this.setResult(errorMsg);

      return errorMsg;
    }
  }

  setObservers(observer: Observer) {
    observer.on("calculate", () => {
      const result = this.calculate();
      observer.notify("calculated", result);
    });

    observer.on("expressionInputChange", (data: string) => {
      this.setExpression(data);
    });

    observer.on("clearExpressionInput", () => {
      this.setExpression("");
      this.setResult("");
    });
  }
}

export default CalculatorModel;
