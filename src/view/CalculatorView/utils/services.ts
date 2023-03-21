import { Operation } from "../../../lib/Calculator";
import { Events } from "../../../shared/events";
import CalculatorView from "..";
import { createButton } from "./elements";
import { btnClickHandler } from "./handlers";
import { IConstant } from "../../../shared/interfaces";

export function initializeObservers(this: CalculatorView) {
  this.on(Events.VIEW_SET_RESULT, (value: string) => {
    this.setResult(value);
  });

  this.on(Events.ADD_NEW_OPERATION, (operation: Operation) => {
    const button = createButton(this, operation.symbol);
    button.onclick = btnClickHandler(button.value, this);
    this.additionalOperationsButtonsContainer.appendChild(button);
  });

  this.on(Events.VIEW_INVALID_EXPRESSION, (msg: string) => {
    alert(msg);
  });

  this.on(Events.ADD_NEW_CONSTANT, ({ name }: IConstant) => {
    const button = createButton(this, name);
    button.onclick = btnClickHandler(button.value, this);
    this.additionalOperationsButtonsContainer.appendChild(button);
  });
}
