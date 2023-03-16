import Calculator, { CalculatorV2, Operation } from "../../lib/Calculator";
import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
import { IObserver } from "../../shared/interface";
import { initializeObservers } from "./services";

class CalculatorModel implements ICalculatorModel, IObserver {
  private expression: string;
  private result: number | string;
  private calculator = new CalculatorV2();
  private observer: Observer = new Observer().getInstance();

  constructor() {
    this.expression = "";
    this.result = 0;
    initializeObservers(this);
  }

  setExpression(expression: string) {
    this.expression = expression;
  }

  setResult(result: number | string) {
    this.result = result;
  }

  getResult(): number | string {
    return this.result;
  }

  getExpression(): string {
    return this.expression;
  }

  addNewOperation(operation: Operation): void {
    this.calculator.addNewOperation(operation);
  }

  getAvailableOperations(): Operation[] {
    return this.calculator.getAvailableOperations();
  }

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: string, data?: any): void {
    this.observer.notify(event, data);
  }

  calculate(): number {
    const result = this.calculator.evaluate(this.expression);
    this.setResult(result);
    return result;
  }
}

export default CalculatorModel;
