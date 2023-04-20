import ICalculatorModel from "@/model/interface";
import { IObserver } from "@/shared";
import ICalculatorView from "@/view/interface";

export default interface ICalculatorController extends IObserver {
  model: ICalculatorModel;
  view: ICalculatorView;

  render(): void;
}
