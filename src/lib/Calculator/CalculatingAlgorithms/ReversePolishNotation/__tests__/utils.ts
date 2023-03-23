import { calculatingAlgorithms } from "../../../config";
import Calculator from "../../../index";

export const evaluator = (function () {
  const evaluator = new Calculator();
  evaluator.setCalculatingAlgorithm(new calculatingAlgorithms.ReversePolishNotation());
  return evaluator;
})();
