// name of all events used by controller, model and view
export enum Events {
  // View events
  VIEW_INPUT_CHANGED = "viewInputChanged",
  VIEW_CALCULATE = "viewCalculate",
  VIEW_SET_RESULT = "viewSetResult",
  VIEW_CHANGE_INPUT = "viewChangeInput",
  // TODO make use
  VIEW_CLEAR_INPUT = "viewClearInput",
  VIEW_ADD_BUTTONS = "viewAddButtons",
  VIEW_INVALID_INPUT = "viewInvalidInput",
  VIEW_VALID_INPUT = "viewValidInput",
  // TODO save in model
  VIEW_HISTORY_FETCHED = "viewHistoryFetch",
  VIEW_RENDER_OPERATIONS = "viewRenderOperations",

  // Model events
  MODEL_CHANGE_INPUT = "changeModelInput",
  MODEL_CALCULATE = "modelCalculate",
  MODEL_CALCULATED = "modelCalculated",
  MODEL_INVALID_INPUT = "modelInvalidInput",
  MODEL_VALID_INPUT = "modelValidInput",
  // TODO make use
  MODEL_CLEAR_INPUT = "modelClearInput",
  MODEL_OPERATIONS_FETCHED = "modelOperationsFetched",

  // General
  CONNECTION_FAILED = "connectionFailed",
}
