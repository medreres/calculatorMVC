import { calculatingAlgorithms } from "../../../config";
import Evaluator from "../../../index";

export function initializeCalculator() {
  const calc = new Evaluator();
  calc.setCalculatingAlgorithm(new calculatingAlgorithms.RegularExpression());
  return calc;
}
