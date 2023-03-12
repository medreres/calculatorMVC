import { events } from "../shared/сonfig";
import { Operation } from "../lib/Calculator";
import Observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";
import ICalculatorController from "./interface";
import { isValidOperation } from "./utils";
import { IObserver } from "../shared/interface";

class CalculatorController implements ICalculatorController, IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = new Observer().getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;
    this.initializeObservers();
  }

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: string, data?: any): void {
    this.observer.notify(event, data);
  }

  private initializeObservers() {
    // listen for input changes from view
    this.on(events.VIEW_INPUT_CHANGED, (inputValue: string) => {
      this.notify(events.MODEL_CHANGE_INPUT, inputValue);
    });

    // listen for calculate request
    this.on(events.VIEW_CALCULATE, () => {
      this.notify(events.MODEL_CALCULATE);
    });

    // clear input in model
    this.on(events.VIEW_INPUT_CLEARED, () => {
      this.notify(events.MODEL_CLEAR_INPUT);
    });

    // provide view with calculated values
    this.on(events.MODEL_CALCULATED, (value: string) => {
      this.notify(events.VIEW_SET_RESULT, value);
    });

    // add new operation
    this.on(events.VIEW_ADD_NEW_OPERATION, (operation: Operation) => {
      if (isValidOperation(operation)) {
        this.observer.notify(events.MODEL_ADD_NEW_OPERATION, operation);
        this.observer.notify(events.VIEW_ADD_BUTTON, operation.symbol);
      } else {
        this.observer.notify(events.VIEW_ADDING_INVALID_OPERATION);
      }
    });
  }
}

export default CalculatorController;
