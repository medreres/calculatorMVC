
import Calculator from "../Calc";
import Operation from "../Operation";

export const evaluator = (function () {
  const evaluator = new Calculator();

  // adding new operations
  evaluator.addNewOperation(
    new Operation("!", 3, (a: number) => {
      function fact(n: number): number {
        if (n === 0 || n === 1) {
          return 1;
        } else return n * fact(n - 1);
      }

      return fact(a);
    })
  );

  return evaluator;
})();
