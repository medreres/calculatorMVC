import Observer from "../../lib/Observer";
import ICalculatorModel from "../../model/interface";
import ICalculatorView from "../../view/interface";
import ICalculatorController from "../interface";
import { IObserver } from "../../shared/interfaces";
import { initializeHistory, initializeObservers, initializeOperations } from "./services";

class CalculatorController implements ICalculatorController, IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = Observer.getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;

    initializeObservers.call(this);
    initializeHistory.call(this);
    initializeOperations.call(this);
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
}

export default CalculatorController;
