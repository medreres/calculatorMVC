// algorithms available

import {CalculatingAlgorithms} from "../lib/Calculator/config";

// Errors description
const errorsDescription = {
  MISSING_EXPRESSION: "Please provide expression to calculate",
  INVALID_EXPRESSION: "Expression is not valid",
};

// settings for project
export default {
  /**  Algorithm used for evaluating expression */
  errorsDescription,
  evaluatingAlgorithm: CalculatingAlgorithms.RegularExpression,
};
