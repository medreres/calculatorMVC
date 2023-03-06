import ExpressionEvaluator, { Operation } from "..";

describe("testing evaluating algorithm", () => {
  const evaluator = initializeClass();
  describe("Simple operations.", () => {
    test("1 + 2 = 3", () => {
      expect(evaluator.evaluate("1 + 2")).toBe(3);
    });

    test("Empty expression = 0", () => {
      expect(evaluator.evaluate("")).toBe(0);
    });

    test("1  * 2 = 2", () => {
      expect(evaluator.evaluate("1 * 2")).toBe(2);
    });

    test("1 * 0 = 0", () => {
      expect(evaluator.evaluate("1 * 0")).toBe(0);
    });

    test("0 * 0 = 0", () => {
      expect(evaluator.evaluate("0 * 0")).toBe(0);
    });

    test("1 / 0 = Inf", () => {
      expect(evaluator.evaluate("1 / 0")).toBe(Infinity);
    });

    test("1 ^ 0 = 1", () => {
      expect(evaluator.evaluate("1 ^ 0")).toBe(1);
    });

    test("10 ^ 0 = 1", () => {
      expect(evaluator.evaluate("10 ^ 0")).toBe(1);
    });

    test("2 ^ 3 = 8", () => {
      expect(evaluator.evaluate("2 ^ 3")).toBe(8);
    });

    test("tan 0 = 0", () => {
      expect(evaluator.evaluate("tan 0")).toBe(0);
    });

    test("5 ! + 20 = 140", () => {
      expect(evaluator.evaluate("5 ! + 20")).toBe(140);
    });

    test("0! = 1", () => {
      expect(evaluator.evaluate("0 !")).toBe(1);
    });
  });

  describe("Respecting priorities", () => {
    test("2 + 2 * 2 = 6", () => {
      expect(evaluator.evaluate("2 + 2 * 2")).toBe(6);
    });

    test("( 1 + 2 ) * ( 1 + 3 ) = 12", () => {
      expect(evaluator.evaluate("( 1 + 2 ) * ( 1 + 3 )")).toBe(12);
    });

    test("lg ( 10 ^ 0 + 1 ) = 0.3010299956639812", () => {
      expect(evaluator.evaluate("lg ( 10 ^ 0 + 1 )")).toBe(0.3010299956639812);
    });

    test("3 ^ 2 ^ 3 = 6561", () => {
      expect(evaluator.evaluate("3 ^ 2 ^ 3")).toBe(6561);
    });

    test("1 ^ ln 1 = 1", () => {
      expect(evaluator.evaluate("1 ^ ln 1")).toBe(1);
    });

    test("2 ^ 3 ! = 64", () => {
      expect(evaluator.evaluate("2 ^ 3 !")).toBe(64);
    });
  });

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
