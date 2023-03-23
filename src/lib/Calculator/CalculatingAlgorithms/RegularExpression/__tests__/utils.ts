import RegularExpression from "..";
import Evaluator from "../../../index";

export function initializeCalculator() {
  const calc = new Evaluator();
  calc.setCalculatingAlgorithm(new RegularExpression());
  return calc;
}
