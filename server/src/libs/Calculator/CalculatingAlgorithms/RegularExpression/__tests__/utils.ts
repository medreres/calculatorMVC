import Calculator from "../../..";
import RegularExpression from "..";

export function initializeCalculator() {
  const calc = new Calculator();
  calc.setCalculatingAlgorithm(new RegularExpression());
  return calc;
}
