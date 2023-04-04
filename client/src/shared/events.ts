// name of all events used by controller, model and view
export enum Events {
  // View events
  VIEW_INPUT_CHANGED = "viewInputChanged",
  VIEW_CALCULATE = "viewCalculate",
  VIEW_SET_RESULT = "viewSetResult",
  VIEW_CHANGE_INPUT = "viewChangeInput",
  VIEW_ADD_BUTTONS = "viewAddButtons",
  VIEW_INVALID_INPUT = "viewInvalidInput",
  VIEW_VALID_INPUT = "viewValidInput",
  VIEW_RENDER_OPERATIONS = "viewRenderOperations",
  VIEW_RENDER_HISTORY = "viewRenderHistory",

  // Model events
  MODEL_CHANGE_INPUT = "changeModelInput",
  MODEL_CALCULATE = "modelCalculate",
  MODEL_CALCULATED = "modelCalculated",
  MODEL_INVALID_INPUT = "modelInvalidInput",
  MODEL_VALID_INPUT = "modelValidInput",
  MODEL_OPERATIONS_FETCHED = "modelOperationsFetched",
  MODEL_HISTORY_FETCHED = "viewHistoryFetch",
  MODEL_RENDER_HISTORY = "modelRendererHistory",
  MODEL_ADD_HISTORY = "modelAddHistory",
  MODEL_CALCULATE_REQUEST = "modelCalculateRequest",

  // General
  CONNECTION_FAILED = "connectionFailed",
}
