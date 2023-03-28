import { CalculatingAlgorithms, Calculator } from "../../../internal";

export const evaluator = (function () {
  const evaluator = new Calculator();
  evaluator.setCalculatingAlgorithm(new CalculatingAlgorithms.ReversePolishNotation());
  return evaluator;
})();
