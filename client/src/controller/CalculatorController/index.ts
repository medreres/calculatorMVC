import Observer from "@/lib/Observer";
import ICalculatorModel from "@/model/interface";
import { Events, IObserver } from "@/shared";
import ICalculatorView from "@/view/interface";
import ICalculatorController from "../interface";
import { initializeHistory, initializeObservers, initializeExpressions } from "./services";

class CalculatorController implements ICalculatorController, IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = Observer.getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;

    initializeObservers.call(this);
    initializeHistory.call(this);
    initializeExpressions.call(this);
  }

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: Events, data?: any): void {
    this.observer.notify(event, data);
  }

  render() {
    this.observer.notify(Events.VIEW_RENDER);
  }
}

export default CalculatorController;
