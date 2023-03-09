import { events } from "../../../events.config";
import Observer from "../../../lib/Observer";
import ICalculatorView from "../../interface";
import { operations } from "../buttons.config";

export const btnClickHandler = (btnValue: string, viewInstance: ICalculatorView) => {
  const observer = (new Observer).getInstance();
  // console.log(btnValue)
  if (btnValue === operations.CALCULATE) {
    return () => {
      observer.notify(events.CALCULATE, btnValue);
    };
  } else if (btnValue == operations.CLEAR_INPUT) {
    return () => {
      observer.notify(events.CLEAR_INPUT);
      viewInstance.setExpression("");
      viewInstance.setResult("");
    };
  } else {
    return (e: Event) => {
      // if it's a number or a dot, then don't add any spaces, in other case add spaces on both sides
      const isNumber = !isNaN(+btnValue) || btnValue === ".";
      const expression = `${viewInstance.getExpression()}${isNumber ? "" : " "}${btnValue}${isNumber ? "" : " "}`;
      viewInstance.setExpression(expression);
      observer.notify(events.INPUT_CHANGE, expression);
    };
  }
};
