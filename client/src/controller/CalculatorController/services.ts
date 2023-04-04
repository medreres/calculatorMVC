import CalculatorController from ".";
import { Events } from "../../shared/events";
import { IOperation } from "../../shared/interfaces";
import { calculateRequestHandler } from "./utils/handlers";
import { fetchHistory, fetchOperationsSymbols } from "./utils/requests";

export function initializeObservers(this: CalculatorController) {
  this.on(Events.VIEW_INPUT_CHANGED, (inputValue: string) => this.notify(Events.MODEL_CHANGE_INPUT, inputValue));

  this.on(Events.VIEW_CALCULATE, () => this.notify(Events.MODEL_CALCULATE));

  this.on(Events.MODEL_INVALID_INPUT, () => this.notify(Events.VIEW_INVALID_INPUT));

  this.on(Events.MODEL_VALID_INPUT, () => this.notify(Events.VIEW_VALID_INPUT));

  this.on(Events.MODEL_CALCULATED, (value: string) => this.notify(Events.VIEW_SET_RESULT, value));

  this.on(Events.MODEL_RENDER_HISTORY, (value: IOperation[]) => this.notify(Events.VIEW_RENDER_HISTORY, value));

  this.on(Events.MODEL_CALCULATE_REQUEST, calculateRequestHandler.bind(this));
}

export function initializeHistory(this: CalculatorController) {
  fetchHistory()
    .then((data) => {
      this.notify(Events.MODEL_HISTORY_FETCHED, data);
    })
    .catch(() => {
      this.notify(Events.CONNECTION_FAILED);
    });
}

export function initializeOperations(this: CalculatorController) {
  fetchOperationsSymbols()
    .then((symbols) => {
      this.notify(Events.MODEL_OPERATIONS_FETCHED, symbols);
      this.notify(Events.VIEW_RENDER_OPERATIONS, symbols);
    })
    .catch(() => {
      this.notify(Events.CONNECTION_FAILED);
    });
}
