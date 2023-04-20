import { IOperation } from "../interfaces";

export enum ModelEvents {
  CHANGE_INPUT = "changeModelInput",
  INVALID_INPUT = "modelInvalidInput",
  VALID_INPUT = "modelValidInput",

  CALCULATE = "modelCalculate",
  CALCULATED = "modelCalculated",

  OPERATIONS_FETCHED = "modelOperationsFetched",
  HISTORY_FETCHED = "viewHistoryFetch",

  RENDER_HISTORY = "modelRendererHistory",
  ADD_HISTORY = "modelAddHistory",

  CALCULATE_REQUEST = "modelCalculateRequest",
}

export interface IModelEvents {
  [ModelEvents.CHANGE_INPUT]: string;
  [ModelEvents.INVALID_INPUT]: string;
  [ModelEvents.VALID_INPUT]: string;

  [ModelEvents.CALCULATE]: string;
  [ModelEvents.CALCULATED]: string;

  [ModelEvents.OPERATIONS_FETCHED]: string[];
  [ModelEvents.HISTORY_FETCHED]: IOperation[];

  [ModelEvents.RENDER_HISTORY]: IOperation[];
  [ModelEvents.ADD_HISTORY]: IOperation;

  [ModelEvents.CALCULATE_REQUEST]: string;
}
