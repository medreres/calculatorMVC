import { Notation } from "../../Operation/interfaces";
import Operation from "../../Operation";
import Evaluator from "../Evaluator";

export function initializeCalculator() {
  const calc = new Evaluator();
  const factorial = new Operation("!", 3, Notation.POSTFIX, (a: number) => {
    let acc = 1;
    for (let i = 1; i <= a; i++) {
      acc *= i;
    }
    return acc;
  });

  calc.addNewOperation(factorial);

  return calc;
}
