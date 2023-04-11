import CalculatorView from "..";
import { buttonValues } from "../config";

beforeAll(() => {
  const view = new CalculatorView();
  view.render();
});

describe("UI rendering", () => {
  it("Expression input", () => {
    const input = document.querySelector("input");

    expect(input).not.toBeNull();
  });

  it("Keys", async () => {
    const keys = document.querySelectorAll(".calc-btn");

    expect(keys.length).toBe(buttonValues.flat().length);
  });

  it("History", async () => {
    const history = document.querySelector("#history-dropdown");

    expect(history).not.toBeNull();
  });
});
