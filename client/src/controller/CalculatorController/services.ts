import CalculatorController from ".";
import { BASE_URL } from "../../config";
import { Events } from "../../shared/events";
import { IConstant } from "../../shared/interfaces";
import { buildUrl } from "../../utils/buildUrl";

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

  // provide view with calculated values
  controllerInstance.on(Events.MODEL_CALCULATED, (value: string) => {
    controllerInstance.notify(Events.VIEW_SET_RESULT, value);
  });

  fetchHistory.call(controllerInstance);

  fetchOperationsSymbols().then((symbols) => {
    controllerInstance.notify(Events.VIEW_ADD_BUTTONS, symbols.flat());
  });
};

export function fetchHistory(this: CalculatorController) {
  const url = buildUrl("/last-operations", BASE_URL);
  fetch(url)
    .then((response) => response.json())
    .then(({ data }) => {
      this.notify(Events.VIEW_HISTORY_FETCHED, data);
    });
}

export async function fetchOperationsSymbols() {
  // make uniform interface for all symbols to work easier
  return Promise.all([
    fetch(buildUrl("/operations", BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data),

    // we only need name of those constants
    fetch(buildUrl("/constants", BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data.map((constant: IConstant) => constant.key)),
  ]);
}
