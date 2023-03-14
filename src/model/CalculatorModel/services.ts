import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";
import CalculatorModel from "./CalculatorModel";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  modelInstance.on(events.MODEL_CALCULATE, () => {
    const result = modelInstance.calculate();
    modelInstance.notify(events.MODEL_CALCULATED, result);
  });

  modelInstance.on(events.MODEL_CHANGE_INPUT, (data: string) => {
    modelInstance.setExpression(data);
  });

  modelInstance.on(events.MODEL_CLEAR_INPUT, () => {
    modelInstance.setExpression("");
    modelInstance.setResult("");
  });

  modelInstance.on(events.ADD_NEW_OPERATION, (operation: Operation) => {
    modelInstance.addNewOperation(operation);
  });
};
