import { events } from "../shared/events.config";
import { Operation } from "../lib/Calculator";
import Observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";
import ICalculatorController from "./interface";
import { isValidOperation } from "./utils";

class CalculatorController implements ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = new Observer().getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;
    this.setObserver();
  }

  private setObserver() {
    // listen for input changes from view
    this.observer.on(events.VIEW_INPUT_CHANGED, (inputValue: string) => {
      this.observer.notify(events.MODEL_CHANGE_INPUT, inputValue);
    });

    // listen for calculate request
    this.observer.on(events.VIEW_CALCULATE, () => {
      this.observer.notify(events.MODEL_CALCULATE);
    });

    // clear input in model
    this.observer.on(events.VIEW_INPUT_CLEARED, () => {
      this.observer.notify(events.MODEL_CLEAR_INPUT);
    });

    // provide view with calculated values
    this.observer.on(events.MODEL_CALCULATED, (value: string) => {
      this.observer.notify(events.VIEW_SET_RESULT, value);
    });

    // add new operation
    this.observer.on(events.VIEW_ADD_NEW_OPERATION, (operation: Operation) => {
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
