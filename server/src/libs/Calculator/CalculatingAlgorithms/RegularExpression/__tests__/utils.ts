import Calculator from "../../..";
import CalculatingAlgorithms from "../..";

export function initializeCalculator() {
  const calc = new Calculator();
  calc.setCalculatingAlgorithm(new CalculatingAlgorithms.RegularExpression());
  return calc;
}