import { connectionFailed, initializeApp } from "./utils";
const input = document.querySelector("input") as HTMLInputElement;

describe("Interaction", () => {
  initializeApp();

  it("Click on button changes input", () => {
    const button = document.querySelector(".btn-light") as HTMLButtonElement;

    button.click();

    expect(input.value).toBe(button.value);
  });

  it("Click on clear button clears input", () => {
    const button = document.querySelector(".btn-light") as HTMLButtonElement;
    const clearButton = document.querySelector(".all-clear") as HTMLButtonElement;

    button.click();
    expect(input.value).toBe(button.value);

    clearButton.click();
    expect(input.value).toBe("");
  });
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

  it("Banner of absence of connection to server is shown", () => {
    connectionFailed();

    const alert = document.querySelector(".alert");

    expect(alert).not.toBeNull();
  });

  it("Banner of absence of connection to server is shown", () => {
    connectionFailed();

    const alert = document.querySelector(".alert");

    expect(alert).not.toBeNull();
  });

  it("History is shown", async () => {
    const historyBtn = document.querySelector("button[value='1+2']") as HTMLButtonElement;

    expect(historyBtn).not.toBeNull();
  });
});
