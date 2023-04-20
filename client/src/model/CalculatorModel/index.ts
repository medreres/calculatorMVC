import ICalculatorModel from "../interface";
import { initializeObservers } from "./services";
import { containsOperations, isInputValid } from "./utils";
import { HISTORY_SIZE } from "@/config";
import Observer from "@/lib/Observer";
import { IModelEvents, IOperation, MainOperations, ModelEvents, removeSpaces } from "@/shared";

class CalculatorModel implements ICalculatorModel {
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
      this.notify(ModelEvents.VALID_INPUT);
    } else {
      this.notify(ModelEvents.INVALID_INPUT);
    }
  }

  getExpression(): string {
    return this.expression;
  }

  getHistory(): IOperation[] {
    return this.operationsHistory;
  }

  addHistory(operation: IOperation): boolean {
    const history = this.operationsHistory.find((history) => history.expression === operation.expression);

    // if operation is present in history, then move it to the top
    if (history) {
      this.operationsHistory = [
        operation,
        ...this.operationsHistory.filter((history) => history.expression != operation.expression),
      ];
      return false;
    }

    if (this.operationsHistory.length >= HISTORY_SIZE) {
      this.operationsHistory.pop();
    }
    this.operationsHistory.unshift(operation);

    return true;
  }

  calculate() {
    if (containsOperations.call(this, this.expression)) {
      this.notify(ModelEvents.CALCULATE_REQUEST, this.expression);
    } else {
      this.notify(ModelEvents.INVALID_INPUT);
    }
  }

  //------ Observers
  on<EventName extends keyof IModelEvents>(event: EventName, callback: (arg: IModelEvents[EventName]) => void): void {
    this.observer.on(event, callback);
  }

  notify<EventName extends keyof IModelEvents>(event: EventName, data?: IModelEvents[EventName]): void {
    this.observer.notify(event, data);
  }
}

export default CalculatorModel;
