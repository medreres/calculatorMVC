import { events } from "../events.config";
import { Operation } from "../lib/Calculator";
import observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";
import ICalculatorController from "./interface";

class CalculatorController implements ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;
  // observer: IObserver;

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    // this.observer = Observer;
    this.model = model;
    this.view = view;
  }

  addNewOperation(operation: Operation) {
    observer.notify(events.NEW_OPERATION, operation);
  }
}

export default CalculatorController;
