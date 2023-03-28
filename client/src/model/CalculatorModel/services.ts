import { Events } from "../../shared/events";
import CalculatorModel from ".";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  // TODO sending undefined
  modelInstance.on(Events.MODEL_CALCULATE, () => {
    modelInstance.calculate().then((result) => modelInstance.notify(Events.MODEL_CALCULATED, result));
  });

  modelInstance.on(Events.MODEL_CHANGE_INPUT, (data: string) => {
    modelInstance.setExpression(data);
  });

  modelInstance.on(Events.MODEL_CLEAR_INPUT, () => {
    modelInstance.setExpression("");
    modelInstance.setResult("");
  });
};
