import { Operations } from "../../lib/Calculator";

export enum Actions {
  CLEAR_INPUT = "AC",
  CALCULATE = "=",
  REMOVE_SYMBOL = "⌫",
}

export const buttonValues = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", Operations.DOT, Actions.CLEAR_INPUT, Actions.CALCULATE, Actions.REMOVE_SYMBOL],
];
