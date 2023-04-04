import { Events } from "../../shared/events";
import CalculatorModel from ".";
import { modelCalculatedHandler, historyFetchedHandler, addHistoryHandler } from "./utils/handlers";

export function initializeObservers(this: CalculatorModel) {
  this.on(Events.MODEL_CALCULATE, () => this.calculate());

  this.on(Events.MODEL_CALCULATED, modelCalculatedHandler.bind(this));

  this.on(Events.MODEL_CHANGE_INPUT, (data: string) => this.setExpression(data));

  this.on(Events.MODEL_OPERATIONS_FETCHED, (data: string[]) => (this.operations = data));

  this.on(Events.MODEL_HISTORY_FETCHED, historyFetchedHandler.bind(this));

  this.on(Events.MODEL_ADD_HISTORY, addHistoryHandler.bind(this));
}
