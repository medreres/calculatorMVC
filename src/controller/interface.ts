import { Operation } from "../lib/Calculator";
import Observer from "../lib/Observer";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";

export default interface ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;
  // observer: Observer;
  addNewOperation: (operation: Operation) => void;
}
