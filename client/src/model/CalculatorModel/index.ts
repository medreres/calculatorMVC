import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
import { IObserver, IOperation } from "../../shared/interfaces";
import { initializeObservers } from "./services";
import { Events } from "../../shared/events";
import { removeSpaces } from "../../shared/utils";
import { MainOperations } from "../../shared/operations";
import { HISTORY_SIZE } from "../../config";
import { isInputValid } from "./utils";

class CalculatorModel implements ICalculatorModel, IObserver {
  private expression: string;
  private observer: Observer = Observer.getInstance();
  protected operations: string[];
  protected operationsHistory: IOperation[];

  constructor() {
    this.expression = "";

    // listen to events
    initializeObservers.call(this);

    this.operations = Object.values(MainOperations);
    this.operationsHistory = [];
  }

  //------ Interaction
  setExpression(expression: string) {
    this.expression = removeSpaces(expression);

    const isValid = isInputValid(expression, this.operations);

    if (isValid) {
      this.notify(Events.MODEL_VALID_INPUT);
    } else {
      this.notify(Events.MODEL_INVALID_INPUT);
    }
  }

  getExpression(): string {
    return this.expression;
  }

  getHistory(): IOperation[] {
    return this.operationsHistory;
  }

  addHistory(operation: IOperation): boolean {
    if (this.operationsHistory.some((history) => history.expression === operation.expression)) {
      return false;
    }

    if (this.operationsHistory.length >= HISTORY_SIZE) {
      this.operationsHistory.shift();
    }

    this.operationsHistory.push(operation);

    return true;
  }

  calculate() {
    this.notify(Events.MODEL_CALCULATE_REQUEST, this.expression);
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
