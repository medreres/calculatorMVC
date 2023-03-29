import { Events } from "../../../shared/events";
import { Actions } from "../config";
import CalculatorView from "..";
import { setInputValidity, toggleCalculateButton } from "./services";
import { isInputValid } from "./regex";

export const btnClickHandler = (btnValue: string, viewInstance: CalculatorView): (() => void) => {
  let handler;

  switch (btnValue) {
    case Actions.CALCULATE:
      handler = () => {
        viewInstance.notify(Events.VIEW_CALCULATE);
      };
      break;

    case Actions.CLEAR_INPUT:
      handler = () => {
        viewInstance.setExpression("");
        setInputValidity(true);
        toggleCalculateButton(true);
        viewInstance.notify(Events.VIEW_INPUT_CLEARED);
      };
      break;

    case Actions.REMOVE_SYMBOL:
      handler = () => {
        const newExpression = viewInstance.getExpression().slice(0, length - 1);
        viewInstance.setExpression(newExpression);
        viewInstance.notify(Events.VIEW_INPUT_CHANGED, newExpression);
      };
      break;

    default:
      handler = () => {
        // if it's a number or a dot, then don't add any spaces, in other case add spaces on both sides
        const expression = `${viewInstance.getExpression()}${btnValue}`;
        viewInstance.setExpression(expression);

        viewInstance.notify(Events.VIEW_INPUT_CHANGED, expression);

        setInputValidity(isInputValid(expression));
      };
      break;
  }

  return handler;
};

export function expressionInputChangeHandler(this: CalculatorView) {
  let handler = (e: Event) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      this.notify(Events.VIEW_INPUT_CLEARED, (e?.target as HTMLInputElement).value);
      setInputValidity(true);
      toggleCalculateButton(true);
    } else {
      const inputValue = (e?.target as HTMLInputElement).value;
      // send request to model to check if expression is valid

      setInputValidity(isInputValid(inputValue));

      this.notify(Events.VIEW_INPUT_CHANGED, inputValue);
    }
  };
  return handler;
}

export function expressionInputSubmitHandler(this: CalculatorView) {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      // if button is disabled do nothing
      const target = event.target as HTMLInputElement;
      if (target.classList.contains("is-invalid") || target.value.length === 0) {
        return;
      }

      this.notify(Events.VIEW_CALCULATE);
    }
  };
}
