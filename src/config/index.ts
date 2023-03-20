import Calculator, { CalculatorV2 } from "../lib/Calculator";

/**
 * Algorithm used for calculating
 */
const calculatingAlgorithm = {
  PolishNotation: Calculator,
  RegularExpressions: CalculatorV2,
};

// settings for project
export default {
  calculatingAlgorithm: calculatingAlgorithm.RegularExpressions,
};
