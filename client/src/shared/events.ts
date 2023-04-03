// name of all events used by controller, model and view
export enum Events {
  // View events
  VIEW_INPUT_CHANGED = "viewInputChanged",
  VIEW_CALCULATE = "viewCalculate",
  VIEW_SET_RESULT = "viewSetResult",
  VIEW_CHANGE_INPUT = "viewChangeInput",
  VIEW_ADD_BUTTONS = "viewAddButtons",
  VIEW_INVALID_INPUT = "viewInvalidInput",
  VIEW_HISTORY_FETCHED = "viewHistoryFetch",

  // Model events
  MODEL_CHANGE_INPUT = "changeModelInput",
  MODEL_CALCULATE = "modelCalculate",
  MODEL_CALCULATED = "modelCalculated",
  MODEL_INVALID_INPUT = "modelInvalidInput",

  // General
  CONNECTION_FAILED = "connectionFailed",
}
