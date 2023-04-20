import { GeneralEvents, ModelEvents, ViewEvents } from "@/shared";
import CalculatorController from ".";
import { calculateRequestHandler, fetchHistory, fetchOperationsSymbols } from "./utils";

export function initializeObservers(this: CalculatorController) {
  this.on(ViewEvents.INPUT_CHANGED, (inputValue: string) => this.notify(ModelEvents.CHANGE_INPUT, inputValue));

  this.on(ViewEvents.CALCULATE, () => this.notify(ModelEvents.CALCULATE));

  this.on(ModelEvents.INVALID_INPUT, () => this.notify(ViewEvents.INVALID_INPUT));

  this.on(ModelEvents.VALID_INPUT, () => this.notify(ViewEvents.VALID_INPUT));

  this.on(ModelEvents.CALCULATED, (value: string) => this.notify(ViewEvents.SET_INPUT, value));

  this.on(ModelEvents.RENDER_HISTORY, (value) => this.notify(ViewEvents.RENDER_HISTORY, value));

  this.on(ModelEvents.CALCULATE_REQUEST, calculateRequestHandler.bind(this));
}

export function initializeHistory(this: CalculatorController) {
  fetchHistory()
    .then((data) => {
      this.notify(ModelEvents.HISTORY_FETCHED, data);
    })
    .catch(() => {
      this.notify(GeneralEvents.CONNECTION_FAILED);
    });
}

export function initializeExpressions(this: CalculatorController) {
  fetchOperationsSymbols()
    .then((symbols) => {
      this.notify(ModelEvents.OPERATIONS_FETCHED, symbols);
      this.notify(ViewEvents.RENDER_OPERATIONS, symbols);
    })
    .catch(() => {
      this.notify(GeneralEvents.CONNECTION_FAILED);
    });
}
