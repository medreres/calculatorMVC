import { Operation } from "../../lib/Calculator";
import { events } from "../../shared/config";
import CalculatorView from "./CalculatorView";
import { createButton } from "./utils/elements";
import { btnClickHandler } from "./utils/handlers";

export const initializeObservers = (viewInstance: CalculatorView) => {
  viewInstance.on(events.VIEW_SET_RESULT, (value: string) => {
    viewInstance.setResult(value);
  });

  viewInstance.on(events.ADD_NEW_OPERATION, (operation: Operation) => {
    const button = createButton(viewInstance, operation.symbol);
    button.onclick = btnClickHandler(button.value, viewInstance);
    viewInstance.additionalOperationsButtonsContainer.appendChild(button);
  });

  viewInstance.on(events.VIEW_INVALID_EXPRESSION, (msg: string) => {
    alert(msg);
  });
};
