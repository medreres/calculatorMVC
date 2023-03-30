import Calculator from "../../../../Calculator";
import CalculatingAlgorithms from "../..";

export const evaluator = (function () {
  const evaluator = new Calculator();
  evaluator.setCalculatingAlgorithm(new CalculatingAlgorithms.ReversePolishNotation());
  return evaluator;
})();
