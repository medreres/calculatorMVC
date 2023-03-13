import Calc, { Operation } from "../../lib/Calculator";
import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
import { IObserver } from "../../shared/interface";
import { initializeObservers } from "./services";

class CalculatorModel implements ICalculatorModel, IObserver {
  expression: string;
  result: number | string;
  private calculator = new Calc();
  private observer: Observer = new Observer().getInstance();

  constructor() {
    this.expression = "";
    this.result = "";
    initializeObservers(this);
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

  addNewOperation(operation: Operation): void {
    this.calculator.addNewOperation(operation);
  }

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: string, data?: any): void {
    this.observer.notify(event, data);
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
}

export default CalculatorModel;
