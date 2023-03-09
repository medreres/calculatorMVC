import { events } from './../../events.config';
import Calc, { Operation } from "../../lib/Calculator";
import observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
class CalculatorModel implements ICalculatorModel {
  private calculator = new Calc();
  expression: string;
  result: number | string;

  constructor() {
    this.expression = "";
    this.result = "";
    this.#setObservers();
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
      // if calculation throws an error, just return it
      const errorMsg: string = (error as any).message;
      this.setResult(errorMsg);
      return errorMsg;
    }
  }

  // initialize all event listeners
  #setObservers() {
    observer.on(events.CALCULATE, () => {
      const result = this.calculate();
      observer.notify("calculated", result);
    });

    observer.on(events.INPUT_CHANGE, (data: string) => {
      this.setExpression(data);
    });

    observer.on(events.CLEAR_INPUT, () => {
      this.setExpression("");
      this.setResult("");
    });

    observer.on(events.NEW_OPERATION, (operation: Operation) => {
      this.calculator.addNewOperation(operation);
    })
  }
}

export default CalculatorModel;
