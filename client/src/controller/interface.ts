import ICalculatorModel from "@/model/interface";
import ICalculatorView from "@/view/interface";

export default interface ICalculatorController {
  model: ICalculatorModel;
  view: ICalculatorView;

  render(): void;
}
