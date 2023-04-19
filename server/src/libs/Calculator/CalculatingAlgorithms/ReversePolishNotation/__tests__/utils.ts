import ReversePolishNotation from "..";
import Calculator from "../../..";

export const evaluator = (function () {
  const evaluator = new Calculator();
  evaluator.setCalculatingAlgorithm(new ReversePolishNotation());
  return evaluator;
})();
