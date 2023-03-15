import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";
import CalculatorModel from "./CalculatorModel";

export const initializeObservers = (modelInstance: CalculatorModel) => {
  modelInstance.on(events.MODEL_CALCULATE, () => {
    if (isValidExpression(modelInstance)) {
      const result = modelInstance.calculate();
      modelInstance.notify(events.MODEL_CALCULATED, result);
    } else {
      modelInstance.notify(events.MODEL_INVALID_EXPRESSION);
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

function isValidExpression(modelInstance: CalculatorModel): boolean {
  // ([+-]?\\d\\.?\\d?) - regex for numbers with floating point

  // ${modelInstance
  // .getAvailableOperations()
  // .map((operation) => `(\\${operation.symbol})?`)
  // .join("")})*$ retrieves all the available operators and turn into regex
  const regexRaw = `^(([+-]?\\d\\.?\\d?)*\\s?${modelInstance
    .getAvailableOperations()
    .map((operation) => `(\\${operation.symbol})?`)
    .join("")})*$`;
  const regex = new RegExp(regexRaw);
  return regex.test(modelInstance.getExpression());
}
