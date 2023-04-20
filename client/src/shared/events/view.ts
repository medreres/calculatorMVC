import { IOperation } from "../interfaces";

export enum ViewEvents {
  INPUT_CHANGED = "viewInputChanged",
  SET_INPUT = "viewSetInput",
  INVALID_INPUT = "viewInvalidInput",
  VALID_INPUT = "viewValidInput",

  CALCULATE = "viewCalculate",
  ADD_BUTTONS = "viewAddButtons",

  RENDER_OPERATIONS = "viewRenderOperations",
  RENDER_HISTORY = "viewRenderHistory",
  RENDER = "viewRender",
}

export interface IViewEvents {
  [ViewEvents.INPUT_CHANGED]: string;
  [ViewEvents.SET_INPUT]: string;
  [ViewEvents.INVALID_INPUT]: void;
  [ViewEvents.VALID_INPUT]: void;

  [ViewEvents.CALCULATE]: void;
  [ViewEvents.ADD_BUTTONS]: void;

  [ViewEvents.RENDER_OPERATIONS]: string[];
  [ViewEvents.RENDER_HISTORY]: IOperation[];
  [ViewEvents.RENDER]: void;
}
