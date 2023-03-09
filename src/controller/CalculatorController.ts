import { events } from "../events.config";
import { Operation } from "../lib/Calculator";
import Observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";
import ICalculatorController from "./interface";

class CalculatorController implements ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;
  private observer: Observer = new Observer().getInstance();

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.model = model;
    this.view = view;
  }

  addNewOperation(operation: Operation) {
    this.observer.notify(events.NEW_OPERATION, operation);
  }
}

export default CalculatorController;
