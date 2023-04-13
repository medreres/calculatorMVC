import Observer from "@/lib/Observer";
import ICalculatorModel from "@/model/interface";
import { ViewEvents, EventTypes } from "@/shared";
import ICalculatorView from "@/view/interface";
import ICalculatorController from "../interface";
import { initializeHistory, initializeObservers, initializeExpressions } from "./services";

class CalculatorController implements ICalculatorController {
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

  on<EventName extends keyof EventTypes>(event: EventName, callback: (arg: EventTypes[EventName]) => void): void {
    this.observer.on(event, callback);
  }

  notify<EventName extends keyof EventTypes>(event: EventName, data?: EventTypes[EventName]): void {
    this.observer.notify(event, data);
  }

  render() {
    this.observer.notify(ViewEvents.RENDER);
  }
}

export default CalculatorController;
