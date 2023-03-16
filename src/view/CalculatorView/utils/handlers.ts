import { events } from "../../../shared/config";
import { Actions } from "../config";
import { Operations } from "../../../lib/Calculator";
import CalculatorView from "../CalculatorView";

export const btnClickHandler = (btnValue: string, viewInstance: CalculatorView): (() => void) => {
  let handler;

  // TODO validation
  if (btnValue === Actions.CALCULATE) {
    handler = () => {
      const validationRegex = //
      viewInstance.notify(events.VIEW_CALCULATE, btnValue);
    };
  } else if (btnValue == Actions.CLEAR_INPUT) {
    handler = () => {
      viewInstance.setExpression("");
      viewInstance.setResult("");
      viewInstance.notify(events.VIEW_INPUT_CLEARED);
    };
  } else {
    handler = () => {
      // if it's a number or a dot, then don't add any spaces, in other case add spaces on both sides
      const isNumber = !isNaN(+btnValue) || btnValue === Operations.DOT;
      const expression = `${viewInstance.getExpression()}${isNumber ? "" : " "}${btnValue}${isNumber ? "" : " "}`;
      viewInstance.setExpression(expression);
      viewInstance.notify(events.VIEW_INPUT_CHANGED, expression);
    };
  }

  return handler;
};
