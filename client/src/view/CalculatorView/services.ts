import { GeneralEvents, ViewEvents } from "@/shared";
import CalculatorView from ".";
import {
  connectionFailedHandler,
  invalidInputHandler,
  renderHandler,
  renderHistoryHandler,
  renderOperationsHandler,
  setResultHandler,
  validInputHandler,
} from "./utils";

export function initializeObservers(this: CalculatorView) {
  this.on(ViewEvents.SET_INPUT, setResultHandler.bind(this));

  this.on(ViewEvents.INVALID_INPUT, invalidInputHandler);

  this.on(ViewEvents.VALID_INPUT, validInputHandler);

  this.on(ViewEvents.RENDER_HISTORY, renderHistoryHandler.bind(this));

  this.on(ViewEvents.RENDER_OPERATIONS, renderOperationsHandler.bind(this));

  this.on(GeneralEvents.CONNECTION_FAILED, connectionFailedHandler);

  this.on(ViewEvents.RENDER, renderHandler.bind(this));
}
