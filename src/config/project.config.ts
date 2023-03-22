import { RegexCalculator, RPNCalculator } from "../lib/Calculator";

/**
 * Algorithms available for calculations
 */
const calculatingAlgorithm = {
  PolishNotation: RPNCalculator,
  RegularExpressions: RegexCalculator,
};

// settings for project
export default {
  /**  Algorithm used for evaluating expression */
  calculatingAlgorithm: calculatingAlgorithm.RegularExpressions,
};
