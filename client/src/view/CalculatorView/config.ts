export enum Actions {
  CLEAR_INPUT = "AC",
  CALCULATE = "=",
  REMOVE_SYMBOL = "⌫",
  DOT = ".",
}

export enum MainOperations {
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
  MODULA = "%",
}

export enum AdditionalOperations {
  LEFT_PARENTHESES = "(",
  RIGHT_PARENTHESES = ")",
}

export const buttonValues = [
  [Actions.CLEAR_INPUT, MainOperations.ADDITION, MainOperations.SUBTRACTION, Actions.REMOVE_SYMBOL],
  ["7", "8", "9", MainOperations.MULTIPLICATION],
  ["4", "5", "6", MainOperations.DIVISION],
  ["1", "2", "3", MainOperations.MODULA],
  ["0", Actions.DOT, Actions.CALCULATE],
];
