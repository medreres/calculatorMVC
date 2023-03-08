import { evaluator } from "./utils";

describe("testing evaluating algorithm", () => {
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
