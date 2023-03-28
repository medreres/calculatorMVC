import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
import { IObserver } from "../../shared/interfaces";
import { initializeObservers } from "./services";
import { Events } from "../../shared/events";
import { buildUrl } from "../../utils/buildUrl";
import { BASE_URL } from "../../config";

class CalculatorModel implements ICalculatorModel, IObserver {
  private expression: string;
  private result: number | string;
  private observer: Observer = Observer.getInstance();

  constructor() {
    this.expression = "";
    this.result = 0;
    initializeObservers(this);
  }

  //------ Interaction
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

  isExpressionValid(expression: string) {
    // TODO simple regex for checking expression for validity
    // ? could be used endpoint getOperations to create regex
    // return this.calculator.isExpressionValid(expression);
  }

  async calculate(): Promise<number> {
    const url = buildUrl("/evaluate", BASE_URL, {
      expression: this.getExpression(),
    });
    return fetch(url)
      .then((response) => response.json())
      .then(({ result }) => result as number);
  }

  //------ Observers
  on(event: Events, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: Events, data?: any): void {
    this.observer.notify(event, data);
  }
}

export default CalculatorModel;
