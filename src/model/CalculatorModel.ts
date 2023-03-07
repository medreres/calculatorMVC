import Calc from "../lib/Calc";
import Observer from "../lib/Observer";
import CalculatorModelBaseClass from "./interface";
class CalculatorModel extends CalculatorModelBaseClass {
  private calculator = new Calc();

  calculate(): number {
    try {
      const result = this.calculator.evaluate(this.expression);
      this.setResult(result);
      return result;
    } catch (error) {
      const errorMsg: string = (error as any).message;
      this.setResult(errorMsg);
      throw new Error(errorMsg);
    }
  }

  setObservers(observer: Observer) {
    observer.on("calculate", () => {
      const result = this.calculate();
      observer.notify("calculated", result);
    });

    observer.on("expressionInputChange", (data: string) => {
      // const isNumber = !isNaN(+data);
      // const expression = `${this.expression}${isNumber ? "" : " "}${data}${isNumber ? "" : " "}`;
      this.setExpression(data);
    });
  }
}

export default CalculatorModel;
