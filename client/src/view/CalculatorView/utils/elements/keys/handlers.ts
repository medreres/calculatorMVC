import CalculatorView from "../../..";
import { Events } from "../../../../../shared/events";
import { Actions } from "../../../config";
import { isInputValid, setInputValidity } from "../input";
import { toggleCalculateButton } from "./services";

export function btnClickHandler(this: CalculatorView, btnValue: string): () => void {
  let handler;

  const clearInput = () => {
    this.setExpression("");
    this.notify(Events.VIEW_INPUT_CHANGED, "");
    setInputValidity(true);
    toggleCalculateButton(true);
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
        // TODO could be better
        const expression = `${this.getExpression()}${btnValue}`;
        this.setExpression(expression);
        setInputValidity(isInputValid(expression, this.availableOperators));
        this.notify(Events.VIEW_INPUT_CHANGED, expression);
      };
      break;
  }

  return handler;
}

// TODO could be better
export function expressionInputChangeHandler(this: CalculatorView) {
  let handler = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value.length === 0) {
      this.notify(Events.VIEW_INPUT_CHANGED, "");
      setInputValidity(true);
      toggleCalculateButton(true);
    } else {
      const inputValue = (e?.target as HTMLInputElement).value;
      // send request to model to check if expression is valid

      setInputValidity(isInputValid(inputValue, this.availableOperators));

      this.notify(Events.VIEW_INPUT_CHANGED, inputValue);
      this.setExpression(value);
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
