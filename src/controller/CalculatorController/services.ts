import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";
import CalculatorController from "./CalculatorController";

export const initializeObservers = (controllerInstance: CalculatorController) => {
  // listen for input changes from view
  controllerInstance.on(events.VIEW_INPUT_CHANGED, (inputValue: string) => {
    controllerInstance.notify(events.MODEL_CHANGE_INPUT, inputValue);
  });

  // listen for calculate request
  controllerInstance.on(events.VIEW_CALCULATE, () => {
    controllerInstance.notify(events.MODEL_CALCULATE);
  });

  // clear input in model
  controllerInstance.on(events.VIEW_INPUT_CLEARED, () => {
    controllerInstance.notify(events.MODEL_CLEAR_INPUT);
  });

  // provide view with calculated values
  controllerInstance.on(events.MODEL_CALCULATED, (value: string) => {
    controllerInstance.notify(events.VIEW_SET_RESULT, value);
  });

  // add new operation
  controllerInstance.on(events.VIEW_ADD_NEW_OPERATION, (operation: Operation) => {
    if (isValidOperation(operation)) {
      controllerInstance.notify(events.MODEL_ADD_NEW_OPERATION, operation);
      controllerInstance.notify(events.VIEW_ADD_BUTTON, operation.symbol);
    } else {
      controllerInstance.notify(events.VIEW_ADDING_INVALID_OPERATION);
    }
  });
};

const isValidOperation = (operation: Operation) => {
  try {
    const operationBody = operation.operation;
    const args = [];

    for (let i = 0; i < operationBody.length; i++) {
      args.push(Math.random() * 100);
    }

    // check for validity
    const res = operationBody(...args);

    // if return type is number, then operation is valid
    return !isNaN(res);
  } catch (error) {
    return false;
  }
};
