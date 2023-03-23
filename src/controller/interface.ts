import { Operation } from "../lib/Calculator";
import ICalculatorModel from "../model/interface";
import ICalculatorView from "../view/interface";

export default interface ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;

  getView(): HTMLElement;

  addOperation(operation: Operation): void;

  addConstant(name: string, value: number): void;
}
