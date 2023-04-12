export enum Errors {
  // db errors
  NO_CONNECTION = "No connection to db established",

  // calculator errors
  MISSING_EXPRESSION = "Please provide expression to calculate",
  INVALID_EXPRESSION = "Expression is not valid",

  // validation errors
  INVALID_LIMIT = "Please provide valid limit for expressions(1-50)",
}
