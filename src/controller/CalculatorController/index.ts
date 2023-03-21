import Observer from "../../lib/Observer";
import ICalculatorModel from "../../model/interface";
import ICalculatorView from "../../view/interface";
import ICalculatorController from "../interface";
import { IObserver } from "../../shared/interfaces";
import { initializeObservers } from "./services";
import { Operation } from "../../lib/Calculator";
import { Events } from "../../shared/events";

class CalculatorController implements ICalculatorController, IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = Observer.getInstance();

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

  addNewOperation(operation: Operation): void {
    this.notify(Events.ADD_NEW_OPERATION, operation);
  }

  addNewConstant(name: string, value: number): void {
    this.notify(Events.ADD_NEW_CONSTANT, { name, value });
  }
}

export default CalculatorController;
