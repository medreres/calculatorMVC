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

  controllerInstance.on(events.MODEL_INVALID_EXPRESSION, () => {
    controllerInstance.notify(events.VIEW_INVALID_EXPRESSION)
  })
};
