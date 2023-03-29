// name of all events used by controller, model and view
export enum Events {
  // View events
  VIEW_INPUT_CHANGED = "viewInputChanged",
  VIEW_CALCULATE = "viewCalculate",
  VIEW_SET_RESULT = "viewSetResult",
  VIEW_CHANGE_INPUT = "viewChangeInput",
  VIEW_ADD_BUTTON = "viewAddButton",
  VIEW_INVALID_INPUT = "viewInvalidInput",

  // Model events
  MODEL_CHANGE_INPUT = "changeModelInput",
  MODEL_CALCULATE = "modelCalculate",
  MODEL_CALCULATED = "modelCalculated",
  MODEL_INVALID_INPUT = "modelInvalidInput",

  // global events
  ADD_NEW_OPERATION = "addNewOperation",
  ADD_NEW_CONSTANT = "addNewConstant",
}
