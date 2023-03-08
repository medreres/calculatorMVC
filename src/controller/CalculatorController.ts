import Observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";
import ICalculatorController from "./interface";
class CalculatorController implements ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;
  observer: Observer;

  constructor(model: ICalculatorModel, view: ICalculatorView) {
    this.observer = new Observer();
    this.model = model;
    this.model.setObservers(this.observer);
    this.view = view;
    this.view.setObservers(this.observer);
  }
}

export default CalculatorController;
