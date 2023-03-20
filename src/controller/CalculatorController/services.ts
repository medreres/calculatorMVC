import { Events } from "../../shared/events";
import CalculatorController from "./CalculatorController";

export const initializeObservers = (controllerInstance: CalculatorController) => {
  // listen for input changes from view
  controllerInstance.on(Events.VIEW_INPUT_CHANGED, (inputValue: string) => {
    controllerInstance.notify(Events.MODEL_CHANGE_INPUT, inputValue);
  });

  // listen for calculate request
  controllerInstance.on(Events.VIEW_CALCULATE, () => {
    controllerInstance.notify(Events.MODEL_CALCULATE);
  });

  // clear input in model
  controllerInstance.on(Events.VIEW_INPUT_CLEARED, () => {
    controllerInstance.notify(Events.MODEL_CLEAR_INPUT);
  });

  // provide view with calculated values
  controllerInstance.on(Events.MODEL_CALCULATED, (value: string) => {
    controllerInstance.notify(Events.VIEW_SET_RESULT, value);
  });

  controllerInstance.on(Events.MODEL_INVALID_EXPRESSION, (msg: string) => {
    controllerInstance.notify(Events.VIEW_INVALID_EXPRESSION, msg);
  });
};
