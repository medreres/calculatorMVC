import ExpressionEvaluator, { Operation } from "..";

describe("testing evaluating algorithm", () => {
  const evaluator = initializeClass();
  describe("Throw exception upon unknown operator", () => {
    test("log 2", () => {
      const foo = () => {
        evaluator.evaluate("log 2");
      };
      expect(foo).toThrow(Error);
    });

    test("abs", () => {
      const foo = () => {
        evaluator.evaluate("abs");
      };
      expect(foo).toThrow(Error);
    });
  });

  describe("Throw exception when invalid expression", () => {
    test("(", () => {
      const foo = () => {
        evaluator.evaluate("(");
      };
      expect(foo).toThrow(Error);
    });

    test("(1)", () => {
      const foo = () => {
        evaluator.evaluate("(1)");
      };
      expect(foo).toThrow(Error);
    });

    test("() - ", () => {
      // let result;
      const foo = () => {
        evaluator.evaluate("() - ");
      };

      expect(foo).toThrow(Error);
    });

    test("(1+2)-", () => {
      const foo = () => {
        evaluator.evaluate("(1+2)-");
      };

      foo();
      expect(foo).toThrow(Error);
    });

    test("()", () => {
      const foo = () => {
        evaluator.evaluate("()");
      };
      expect(foo).toThrow(Error);
    });

    test("lg ( 1 + 2", () => {
      const foo = () => {
        evaluator.evaluate("lg ( 1 + 2");
      };
      expect(foo).toThrow(Error);
    });
  });
});

function initializeClass() {
  const evaluator = new ExpressionEvaluator();

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

  evaluator.addNewOperation(new Operation("tan", 3, (a: number) => Math.tan(a)));

  return evaluator;
}
