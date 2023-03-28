import { CalculatingAlgorithms, Calculator } from "../../../internal";

export function initializeCalculator() {
  const calc = new Calculator();
  calc.setCalculatingAlgorithm(new CalculatingAlgorithms.RegularExpression());
  return calc;
}
