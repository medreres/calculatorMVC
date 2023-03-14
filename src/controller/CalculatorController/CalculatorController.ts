import Observer from "../../lib/Observer";
import ICalculatorModel from "../../model/interface";
import ICalculatorView from "../../view/interface";
import ICalculatorController from "../interface";
import { IObserver } from "../../shared/interface";
import { initializeObservers } from "./services";
import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";

class CalculatorController implements ICalculatorController, IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = new Observer().getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;
    initializeObservers(this);
  }

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: string, data?: any): void {
    this.observer.notify(event, data);
  }

  getView(): HTMLElement {
    return this.view.getView();
  }

  addOperation(operation: Operation): void {
    this.notify(events.ADD_NEW_OPERATION, operation);
  }
}

export default CalculatorController;
