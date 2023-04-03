import { Events } from "../../../shared/events";
import CalculatorView from "..";
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
  toggleCalculateButton,
} from "./elements";
import { formatSymbols } from "./formatting";
import { Actions } from "../config";

interface IOperation {
  result: string;
  expression: string;
}
export function initializeObservers(this: CalculatorView) {
  this.on(Events.VIEW_SET_RESULT, (value: string) => {
    this.setExpression(value);
  });

  this.on(Events.VIEW_INVALID_INPUT, () => {
    setInputValidity(false);
    toggleCalculateButton(true);
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

    // TODO
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
      // buttons.push(button);
      // buttonsContainer.appendChild(button);
      addOperationButton(button);
    });
  });

  this.on(Events.CONNECTION_FAILED, () => {
    // TODO handle err
    // document.body.innerHTML =
    //   `<div class="alert alert-danger" role="alert">
    //             Server is not responding. Please try again later.
    //           </div>` + document.body.innerHTML;
  });
}
