import { Events } from "../../../shared/events";
import { Actions } from "../config";
import CalculatorView from "..";
import { isInputValid, setInputValidity, toggleCalculateButton } from "./services";

export function btnClickHandler(this: CalculatorView, btnValue: string): () => void {
  let handler;

  const clearInput = () => {
    this.setExpression("");
    setInputValidity(true);
    toggleCalculateButton(true);
    this.notify(Events.VIEW_INPUT_CHANGED, "");
  };

  switch (btnValue) {
    case Actions.CALCULATE:
      handler = () => {
        this.notify(Events.VIEW_CALCULATE);
      };
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
        this.setExpression(expression);
        setInputValidity(isInputValid(expression, this.availableOperators));
        this.notify(Events.VIEW_INPUT_CHANGED, expression);
      };
      break;
  }

  return handler;
}

export function expressionInputChangeHandler(this: CalculatorView) {
  let handler = (e: Event) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      this.notify(Events.VIEW_INPUT_CHANGED, "");
      setInputValidity(true);
      toggleCalculateButton(true);
    } else {
      const inputValue = (e?.target as HTMLInputElement).value;
      // send request to model to check if expression is valid

      setInputValidity(isInputValid(inputValue, this.availableOperators));

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
