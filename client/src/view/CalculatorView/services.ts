import { Events } from "../../shared/events";
import CalculatorView from ".";
import {
  addHistory,
  addOperationButton,
  btnClickHandler,
  createButton,
  expressionInputChangeHandler,
  getButtonClasses,
  getInnerHtml,
  ICreateButton,
  setInputValidity,
  setCalculateButtonDisabled,
} from "./utils/elements";
import { formatSymbols } from "./utils/formatting";
import { Actions } from "./config";

interface IOperation {
  result: string;
  expression: string;
}
export function initializeObservers(this: CalculatorView) {
  this.on(Events.VIEW_SET_RESULT, (value: string) => {
    addHistory.call(this, {
      expression: this.getExpression(),
      result: value,
      onClick: () => {},
    });

    this.setExpression(value);

    setCalculateButtonDisabled(true);
  });

  this.on(Events.VIEW_INVALID_INPUT, () => {
    setInputValidity(false);
    setCalculateButtonDisabled(true);
  });

  // TODO add to history on calculation
  this.on(Events.VIEW_HISTORY_FETCHED, (history: IOperation[]) => {
    const onClick = expressionInputChangeHandler.call(this);
    history.forEach((operation) => {
      const { expression, result } = operation;

      addHistory.call(this, {
        expression,
        result,
        onClick,
      });
    });
  });

  this.on(Events.VIEW_ADD_BUTTONS, (symbols: string[]) => {
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
  });

  this.on(Events.CONNECTION_FAILED, () => {
    document.body.innerHTML =
      `<div class="alert alert-danger" role="alert">
                Server is not responding. Please try again later.
              </div>` + document.body.innerHTML;
  });
}
