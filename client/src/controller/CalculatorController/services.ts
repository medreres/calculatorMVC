import CalculatorController from ".";
import { Events } from "../../shared/events";
import { fetchHistory, fetchOperationsSymbols } from "./requests";

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
  controllerInstance.on(Events.MODEL_INVALID_INPUT, () => {
    controllerInstance.notify(Events.VIEW_INVALID_INPUT);
  });

  controllerInstance.on(Events.MODEL_VALID_INPUT, () => {
    controllerInstance.notify(Events.VIEW_VALID_INPUT);
  });

  // provide view with calculated values
  controllerInstance.on(Events.MODEL_CALCULATED, (value: string) => {
    controllerInstance.notify(Events.VIEW_SET_RESULT, value);
  });

  // TODO to model
  fetchHistory()
    .then((data) => {
      controllerInstance.notify(Events.VIEW_HISTORY_FETCHED, data);
    })
    .catch(() => {
      controllerInstance.notify(Events.CONNECTION_FAILED);
    });

  fetchOperationsSymbols()
    .then((symbols) => {
      controllerInstance.notify(Events.MODEL_OPERATIONS_FETCHED, symbols);
      controllerInstance.notify(Events.VIEW_RENDER_OPERATIONS, symbols);
    })
    .catch(() => {
      controllerInstance.notify(Events.CONNECTION_FAILED);
    });
};
