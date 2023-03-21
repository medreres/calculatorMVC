import { Operation } from "../../../lib/Calculator";
import { Events } from "../../../shared/events";
import CalculatorView from "..";
import { createButton } from "./elements";
import { btnClickHandler } from "./handlers";

export const initializeObservers = (viewInstance: CalculatorView) => {
  viewInstance.on(Events.VIEW_SET_RESULT, (value: string) => {
    viewInstance.setResult(value);
  });

  viewInstance.on(Events.ADD_NEW_OPERATION, (operation: Operation) => {
    const button = createButton(viewInstance, operation.symbol);
    button.onclick = btnClickHandler(button.value, viewInstance);
    viewInstance.additionalOperationsButtonsContainer.appendChild(button);
  });

  viewInstance.on(Events.VIEW_INVALID_EXPRESSION, (msg: string) => {
    alert(msg);
  });
};
