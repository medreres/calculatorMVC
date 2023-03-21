import Calculator, { CalculatorV2 } from "../lib/Calculator";

/**
 * Algorithms available for calculations
 */
const calculatingAlgorithm = {
  PolishNotation: Calculator,
  RegularExpressions: CalculatorV2,
};

// settings for project
export default {
  /**  Algorithm used for evaluating expression */
  calculatingAlgorithm: calculatingAlgorithm.RegularExpressions,
};
