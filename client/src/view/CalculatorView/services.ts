import { Events } from "../../shared/events";
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
  this.on(Events.VIEW_SET_INPUT, setResultHandler.bind(this));

  this.on(Events.VIEW_INVALID_INPUT, invalidInputHandler);

  this.on(Events.VIEW_VALID_INPUT, validInputHandler);

  this.on(Events.VIEW_RENDER_HISTORY, renderHistoryHandler.bind(this));

  this.on(Events.VIEW_RENDER_OPERATIONS, renderOperationsHandler.bind(this));

  this.on(Events.CONNECTION_FAILED, connectionFailedHandler);

  this.on(Events.VIEW_RENDER, renderHandler.bind(this));
}
