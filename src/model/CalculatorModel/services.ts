import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";
import CalculatorModel from "./CalculatorModel";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  modelInstance.on(events.MODEL_CALCULATE, () => {
    try {
      const result = modelInstance.calculate();
      modelInstance.notify(events.MODEL_CALCULATED, result);
    } catch (error) {
      modelInstance.notify(events.MODEL_INVALID_EXPRESSION, (error as any).message);
    }
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
