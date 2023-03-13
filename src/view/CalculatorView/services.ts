import { events } from "../../shared/config";
import CalculatorView from "./CalculatorView";
import { createButton } from "./utils/elements";
import { btnClickHandler } from "./utils/handlers";
import { clearModalInput } from "./utils/helper";

export const initializeObservers = (viewInstance: CalculatorView) => {
  viewInstance.on(events.VIEW_SET_RESULT, (value: string) => {
    viewInstance.setResult(value);
  });

  viewInstance.on(events.VIEW_ADD_BUTTON, (symbol: string) => {
    const button = createButton(viewInstance, symbol);
    button.onclick = btnClickHandler(button.value, viewInstance);
    viewInstance.additionalOperationsButtonsConatiner.appendChild(button);

    // close open modal for adding operation
    (document.querySelector("#closeModal") as HTMLButtonElement).click();

    // clear inputs
    clearModalInput();
  });

  viewInstance.on(events.VIEW_ADDING_INVALID_OPERATION, () => {
    alert("Function is invalid");
  });
};
