import ExpressionEvaluator from "../lib/calc";
import Observer from "../lib/observer";
import ICalculatorModel from "./interface";
class CalculatorModel extends ICalculatorModel {
  private calculator = new ExpressionEvaluator();

  calculate() {
    try {
      this.result = this.calculator.evaluate(this.expression);
    } catch (error) {
      this.result = error as any;
    }
  }

  setObservers(observer: Observer) {
    observer.on("calculate", () => {
      this.calculate();
      observer.notify("calculated", this.result);
    });

    observer.on("expressionInputChange", (data: string) => {
      // const isNumber = !isNaN(+data);
      // const expression = `${this.expression}${isNumber ? "" : " "}${data}${isNumber ? "" : " "}`;
      this.setExpression(data);
    });
  }
}

export default CalculatorModel;
