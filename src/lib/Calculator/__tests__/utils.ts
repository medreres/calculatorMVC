import Calculator from "../Calculator/Calculator";
import Operation from "../Operation/Operation";

export const evaluator = (function () {
  const evaluator = new Calculator();

  const operations = [
    new Operation("lg", 3, (a: number) => Math.log10(a)),
    new Operation("ln", 3, (a: number) => Math.log(a)),
    new Operation("exp", 3, (a: number) => Math.exp(a)),
    new Operation("tan", 3, (a: number) => Math.tan(a)),
    new Operation("!", 3, (a: number) => {
      function fact(n: number): number {
        if (n === 0 || n === 1) {
          return 1;
        } else return n * fact(n - 1);
      }

      return fact(a);
    }),
  ];

  operations.forEach((operation) => evaluator.addNewOperation(operation));

  return evaluator;
})();
