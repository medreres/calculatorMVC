import { initializeCalculator } from "./utils";

const calc = initializeCalculator();

describe("Exceptions", () => {
  test("1 + ", () => {
    const foo = () => calc.evaluate("1 + ");
    expect(foo).toThrow(Error);
  });

  test("1 + ( ", () => {
    const foo = () => calc.evaluate("1 + ");
    expect(foo).toThrow(Error);
  });

  test("23 - as", () => {
    const foo = () => calc.evaluate("23 - as");
    expect(foo).toThrow(Error);
  });

  test("a + b", () => {
    const foo = () => calc.evaluate("a + b");
    expect(foo).toThrow(Error);
  });

  test("asd", () => {
    const foo = () => calc.evaluate("asd");
    expect(foo).toThrow(Error);
  });

  test("1 + 3 * (2", () => {
    const foo = () => calc.evaluate("1 + 3 * (2");
    expect(foo).toThrow(Error);
  });

  test("- 2 + 3", () => {
    const foo = () => calc.evaluate("- 2 + 3");
    expect(foo).toThrow(Error);
  });

  test("!", () => {
    const foo = () => calc.evaluate("!");
    expect(foo).toThrow(Error);
  });

  test("&*23874", () => {
    const foo = () => calc.evaluate("&*23874");
    expect(foo).toThrow(Error);
  });

  test("Lorem Ipsum", () => {
    const foo = () => calc.evaluate("Lorem Ipsum");
    expect(foo).toThrow(Error);
  });

  test("3ad84817y9haksjndas,d", () => {
    const foo = () => calc.evaluate("3ad84817y9haksjndas,d");
    expect(foo).toThrow(Error);
  });
});
