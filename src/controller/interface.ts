import { Operation } from "../lib/Calculator";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";

export default interface ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;

  getView(): HTMLElement;
  addNewOperation(operation: Operation): void;
}
