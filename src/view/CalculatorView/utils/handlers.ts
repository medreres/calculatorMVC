import { Events } from "../../../shared/events";
import { Actions } from "../config";
import { Operations } from "../../../lib/Calculator";
import CalculatorView from "..";

export const btnClickHandler = (btnValue: string, viewInstance: CalculatorView): (() => void) => {
  let handler;

  if (btnValue === Actions.CALCULATE) {
    handler = () => {
      viewInstance.notify(Events.VIEW_CALCULATE, btnValue);
    };
  } else if (btnValue == Actions.CLEAR_INPUT) {
    handler = () => {
      viewInstance.setExpression("");
      viewInstance.setResult("");
      viewInstance.notify(Events.VIEW_INPUT_CLEARED);
    };
  } else {
    handler = () => {
      // if it's a number or a dot, then don't add any spaces, in other case add spaces on both sides
      const isNumber = !isNaN(+btnValue) || btnValue === Operations.DOT;
      const expression = `${viewInstance.getExpression()}${isNumber ? "" : " "}${btnValue}${isNumber ? "" : " "}`;
      viewInstance.setExpression(expression);
      viewInstance.notify(Events.VIEW_INPUT_CHANGED, expression);
    };
  }

  return handler;
};

export function expressionInputChangeHandler(viewInstance: CalculatorView) {
  let handler = (e: Event) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      // handler = (e: Event) => {
      viewInstance.notify(Events.VIEW_INPUT_CLEARED, (e?.target as HTMLInputElement).value);
      viewInstance.resultInput.value = "";
      // };
    } else {
      // handler = (e: Event) => {
      viewInstance.notify(Events.VIEW_INPUT_CHANGED, (e?.target as HTMLInputElement).value);
      // };
    }
  };
  return handler;
}

export function expressionInputSubmitHandler(viewInstance: CalculatorView) {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      viewInstance.notify(Events.VIEW_CALCULATE);
    }
  };
}
