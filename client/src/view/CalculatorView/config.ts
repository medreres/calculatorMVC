export enum Actions {
  CLEAR_INPUT = "AC",
  CALCULATE = "=",
  REMOVE_SYMBOL = "⌫",
  DOT = ".",
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
  TOGGLE_SIGN = "+/-",
  MODULA = "%",
}

export const buttonValues = [
  [Actions.CLEAR_INPUT, Actions.TOGGLE_SIGN, Actions.MODULA, Actions.DIVISION],
  ["7", "8", "9", Actions.MULTIPLICATION],
  ["4", "5", "6", Actions.SUBTRACTION],
  ["1", "2", "3", Actions.ADDITION],
  ["0", Actions.DOT, Actions.CALCULATE],
];
