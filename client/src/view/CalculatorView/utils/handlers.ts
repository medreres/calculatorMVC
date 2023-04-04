import CalculatorView from "..";
import { Events } from "../../../shared/events";
import { Actions } from "../config";
import { isInputValid, setInputValidity } from "./elements/input";
import { setCalculateButtonDisabled } from "./elements/keys/services";

export function btnClickHandler(this: CalculatorView, btnValue: string): () => void {
  let handler;

  const clearInput = () => {
    this.setExpression("");
    this.notify(Events.VIEW_INPUT_CHANGED, "");
    setInputValidity(true);
    setCalculateButtonDisabled(true);
  };

  switch (btnValue) {
    case Actions.CALCULATE:
      handler = calculateHandler.bind(this);
      break;

    case Actions.CLEAR_INPUT:
      handler = clearInput;
      break;

    case Actions.REMOVE_SYMBOL:
      handler = () => {
        const newExpression = this.getExpression().slice(0, length - 1);

        if (newExpression.length === 0) {
          return clearInput();
        }

        this.setExpression(newExpression);
        this.notify(Events.VIEW_INPUT_CHANGED, newExpression);
      };
      break;

    default:
      handler = () => {
        const expression = `${this.getExpression()}${btnValue}`;
        inputChangeHandler.call(this, expression);
      };
      break;
  }

  return handler;
}

export function expressionInputChangeHandler(this: CalculatorView) {
  let handler = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value.length === 0) {
      inputChangeHandler.call(this, value);
      setInputValidity(true);
      setCalculateButtonDisabled(true);
    } else {
      inputChangeHandler.call(this, value);
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

      calculateHandler.call(this);
    }
  };
}

export function calculateHandler(this: CalculatorView) {
  this.notify(Events.VIEW_CALCULATE);
}

export function inputChangeHandler(this: CalculatorView, value: string) {
  setInputValidity(isInputValid(value, this.availableOperators));

  this.notify(Events.VIEW_INPUT_CHANGED, value);
  this.setExpression(value);
}
