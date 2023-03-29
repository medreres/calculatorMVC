import { Events } from "../../shared/events";
import CalculatorModel from ".";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  modelInstance.on(Events.MODEL_CALCULATE, () => {
    modelInstance
      .calculate()
      .then((result) => {
        modelInstance.notify(Events.MODEL_CALCULATED, result);
      })
      .catch(() => {
        modelInstance.notify(Events.MODEL_INVALID_INPUT);
      });
  });

  modelInstance.on(Events.MODEL_CHANGE_INPUT, (data: string) => {
    modelInstance.setExpression(data);
  });
};
