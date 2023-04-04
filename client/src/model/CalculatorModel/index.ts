import Observer from "../../lib/Observer";
import ICalculatorModel from "../interface";
import { IObserver } from "../../shared/interfaces";
import { initializeObservers, isInputValid } from "./services";
import { Events } from "../../shared/events";
import { buildUrl } from "../../utils/buildUrl";
import { BASE_URL } from "../../config";
import { removeSpaces } from "../../shared/utils";
import { MainOperations } from "../../shared/operations";

class CalculatorModel implements ICalculatorModel, IObserver {
  private expression: string;
  private result: number | string;
  private observer: Observer = Observer.getInstance();
  protected operations: string[];

  constructor() {
    this.expression = "";
    this.result = 0;

    // listen to events
    initializeObservers.call(this);

    this.operations = Object.values(MainOperations);
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

  setResult(result: number | string) {
    this.result = result;
  }

  getResult(): number | string {
    return this.result;
  }

  getExpression(): string {
    return this.expression;
  }

  calculate(): Promise<number> {
    const url = buildUrl("/evaluate", BASE_URL, {
      expression: this.getExpression(),
    });

    return fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())

      .then(({ data, error }) => {
        if (!isNaN(data)) {
          return data as number;
        }
        throw new Error(error);
      });
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
