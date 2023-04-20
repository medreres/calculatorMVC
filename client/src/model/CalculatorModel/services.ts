import { ModelEvents } from "@/shared/events";
import CalculatorModel from ".";
import { modelCalculatedHandler, historyFetchedHandler, addHistoryHandler } from "./utils/handlers";

export function initializeObservers(this: CalculatorModel) {
  this.on(ModelEvents.CALCULATE, () => this.calculate());

  this.on(ModelEvents.CALCULATED, modelCalculatedHandler.bind(this));

  this.on(ModelEvents.CHANGE_INPUT, (data: string) => this.setExpression(data));

  this.on(ModelEvents.OPERATIONS_FETCHED, (data: string[]) => (this.operations = data));

  this.on(ModelEvents.HISTORY_FETCHED, historyFetchedHandler.bind(this));

  this.on(ModelEvents.ADD_HISTORY, addHistoryHandler.bind(this));
}
