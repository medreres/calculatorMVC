import { events } from "../../shared/events.config";
import Calc, { Operation } from "../../lib/Calculator";
import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";

class CalculatorModel implements ICalculatorModel {
  expression: string;
  result: number | string;
  private calculator = new Calc();
  private observer: Observer = new Observer().getInstance();

  constructor() {
    this.expression = "";
    this.result = "";
    this.setObservers();
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
  private setObservers() {
    this.observer.on(events.MODEL_CALCULATE, () => {
      const result = this.calculate();
      this.observer.notify(events.MODEL_CALCULATED, result);
    });

    this.observer.on(events.MODEL_CHANGE_INPUT, (data: string) => {
      this.setExpression(data);
    });

    this.observer.on(events.MODEL_CLEAR_INPUT, () => {
      this.setExpression("");
      this.setResult("");
    });

    this.observer.on(events.MODEL_ADD_NEW_OPERATION, (operation: Operation) => {
      this.calculator.addNewOperation(operation);
    });
  }
}

export default CalculatorModel;
