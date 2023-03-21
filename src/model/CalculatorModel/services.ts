import { Operation } from "../../lib/Calculator";
import { Events } from "../../shared/events";
import CalculatorModel from ".";
import { Constants } from "../../lib/Calculator/interfaces";
import { IConstant } from "../../shared/interfaces";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  modelInstance.on(Events.MODEL_CALCULATE, () => {
    try {
      const result = modelInstance.calculate();
      modelInstance.notify(Events.MODEL_CALCULATED, result);
    } catch (error) {
      modelInstance.notify(Events.MODEL_INVALID_EXPRESSION, (error as any).message);
    }
  });

  modelInstance.on(Events.MODEL_CHANGE_INPUT, (data: string) => {
    modelInstance.setExpression(data);
  });

  modelInstance.on(Events.MODEL_CLEAR_INPUT, () => {
    modelInstance.setExpression("");
    modelInstance.setResult("");
  });

  modelInstance.on(Events.ADD_NEW_OPERATION, (operation: Operation) => {
    modelInstance.addNewOperation(operation);
  });

  modelInstance.on(Events.ADD_NEW_CONSTANT, ({ name, value }: IConstant) => {
    modelInstance.addNewConstant(name, value);
  });
};
