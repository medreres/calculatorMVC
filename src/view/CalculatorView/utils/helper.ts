export const clearModalInput = () => {
  (document.querySelector("#functionBody") as HTMLInputElement).value = "";
  (document.querySelector("#functionArguments") as HTMLInputElement).value = "";
  (document.querySelector("#functionPrecedence") as HTMLInputElement).value = "";
  (document.querySelector("#functionSymbol") as HTMLInputElement).value = "";
};
