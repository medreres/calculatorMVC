import { initializeApp } from "./utils";

describe("Interaction", () => {
  initializeApp();

  it("Click on button changes input", () => {
    // arrange
    const button = document.querySelector(".btn-light") as HTMLButtonElement;
    const input = document.querySelector("input") as HTMLInputElement;

    // act
    button.click();

    // assert

    expect(input.value).toBe(button.value);
  });

  // click on clear button clears the input
  it("Click on clear button clears input", () => {
    // arrange
    const button = document.querySelector(".btn-light") as HTMLButtonElement;
    const clearButton = document.querySelector(".all-clear") as HTMLButtonElement;
    const input = document.querySelector("input") as HTMLInputElement;

    // act
    button.click();
    expect(input.value).toBe(button.value);

    // assert
    clearButton.click();
    expect(input.value).toBe("");
  });

  // TODO how to implement
  // it("Click on evaluate button evaluates the input", async () => {
  //   const calcBtn = document.querySelector(".equal-sign") as HTMLButtonElement;
  //   const clearButton = document.querySelector(".all-clear") as HTMLButtonElement;
  //   const input = document.querySelector("input") as HTMLInputElement;
  //   const expr = ["7", "+", "3"];
  //   expr.forEach((symbol) => {
  //     (document.querySelector(`button[value="${symbol}"]`) as HTMLButtonElement).click();
  //   });

  //   // console.log((document.querySelector(".equal-sign") as any).disabled);

  //   // act

  //   await new Promise<void>((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log(calcBtn.disabled);
  //       resolve();
  //     }, 1000);
  //   });
  //   //  = false;
  //   // calcBtn.click();

  //   console.log(input.value);
  // });
});

describe("Rendering", () => {
  it("Additional operations hidden", () => {
    const additionalOperationContainer = document.querySelector("#operations-keys") as HTMLDivElement;

    expect(additionalOperationContainer.style.display).toBe("none");
  });

  it("Additional operations are shown", () => {
    const additionalOperationContainer = document.querySelector("#operations-keys") as HTMLDivElement;
    const toggler = document.querySelector("#scientificView") as HTMLButtonElement;

    toggler.click();

    expect(additionalOperationContainer.style.display).not.toBe("none");
  });

  // TODO banner of absence of connection is shown

  // TODO history is shown and clickable
});
