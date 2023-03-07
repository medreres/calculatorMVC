import Observer from "../../lib/Observer";
import CalculatorViewBaseClass from "../interface";

// TODO dynamic function declaration
// ? Or beter implements ICalculator instead of extends?
export default class CalculatorViewScientific extends CalculatorViewBaseClass {
  setExpression(expression: string): void {}

  getExpression(): string {
    return "";
  }

  setResult(result: string): void {}

  setObservers(observer: Observer): void {}
}
