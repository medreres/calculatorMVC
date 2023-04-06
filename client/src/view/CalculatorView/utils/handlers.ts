import CalculatorView from "..";
import { Events } from "../../../shared/events";
import { IOperation } from "../../../shared/interfaces";
import { Actions } from "../config";
import {
  addHistory,
  cleanHistory,
  createButton,
  getButtonClasses,
  getInnerHtml,
  ICreateButton,
  setInputValidity,
} from "./elements";
import { addOperationButton, setCalculateButtonDisabled } from "./elements/keys/services";
import { formatSymbols } from "./formatting";

export function btnClickHandler(this: CalculatorView, btnValue: string): () => void {
  let handler;

  const clearInput = () => {
    this.setExpression("");
    this.notify(Events.VIEW_INPUT_CHANGED, "");
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
      const calcBtn = document.querySelector(".equal-sign") as HTMLButtonElement;

      if (calcBtn.disabled || target.value.length === 0) {
        return;
      }

      calculateHandler.call(this);
    }
  };
}

export function calculateHandler(this: CalculatorView) {
  setCalculateButtonDisabled(true);
  this.notify(Events.VIEW_CALCULATE);
}

export function inputChangeHandler(this: CalculatorView, value: string) {
  this.notify(Events.VIEW_INPUT_CHANGED, value);
  this.setExpression(value);
}

export function setResultHandler(this: CalculatorView, value: string) {
  this.setExpression(value);

  setCalculateButtonDisabled(true);
}

export function invalidInputHandler() {
  setInputValidity(false);
  setCalculateButtonDisabled(true);
}

export function validInputHandler() {
  setInputValidity(true);
  setCalculateButtonDisabled(false);
}

export function renderHistoryHandler(this: CalculatorView, history: IOperation[]) {
  if (history.length === 0) {
    return;
  }

  const onClick = expressionInputChangeHandler.call(this);

  cleanHistory();

  history.forEach((operation) => {
    const { expression, result } = operation;

    addHistory.call(this, {
      expression,
      result,
      onClick,
    });
  });
}

export function renderOperationsHandler(this: CalculatorView, symbols: string[]) {
  this.availableOperators = symbols;

  const formattedSymbols = formatSymbols(symbols) as string[];
  // save those operations

  formattedSymbols.forEach((value) => {
    const onClick = btnClickHandler.call(this, value);
    const classList = getButtonClasses(value);
    const innerHtml = getInnerHtml(value);
    const params: ICreateButton = {
      onClick,
      classList,
      value,
      innerHtml,
      disabled: value === Actions.CALCULATE ? true : false,
    };
    const button = createButton(params);
    addOperationButton(button);
  });
}

export function connectionFailedHandler() {
  document.body.innerHTML =
    `<div class="alert alert-danger" role="alert">
              Server is not responding. Please try again later.
            </div>` + document.body.innerHTML;
}
