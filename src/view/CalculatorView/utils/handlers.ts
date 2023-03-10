import { events } from "../../../shared/events.config";
import Observer from "../../../lib/Observer";
import ICalculatorView from "../../interface";
import { operations } from "../buttons.config";
import { Operation } from "../../../lib/Calculator";
import { clearModalInput } from "./helper";

export const btnClickHandler = (btnValue: string, viewInstance: ICalculatorView) => {
  const observer = new Observer().getInstance();
  if (btnValue === operations.CALCULATE) {
    return () => {
      observer.notify(events.VIEW_CALCULATE, btnValue);
    };
  } else if (btnValue == operations.CLEAR_INPUT) {
    return () => {
      viewInstance.setExpression("");
      viewInstance.setResult("");
      observer.notify(events.VIEW_INPUT_CLEARED);
    };
  } else {
    return (e: Event) => {
      // if it's a number or a dot, then don't add any spaces, in other case add spaces on both sides
      const isNumber = !isNaN(+btnValue) || btnValue === ".";
      const expression = `${viewInstance.getExpression()}${isNumber ? "" : " "}${btnValue}${isNumber ? "" : " "}`;
      viewInstance.setExpression(expression);
      observer.notify(events.VIEW_INPUT_CHANGED, expression);
    };
  }
};

export const addFunctionHandler = (e: Event) => {
  e.preventDefault();

  const functionBody = document.querySelector("#functionBody") as HTMLInputElement;
  const functionArguments = document.querySelector("#functionArguments") as HTMLInputElement;
  const functionPrecedence = document.querySelector("#functionPrecedence") as HTMLInputElement;
  const functionSymbol = document.querySelector("#functionSymbol") as HTMLInputElement;

  const argumentsArr = functionArguments.value.split(",");

  const newOperationFunction = new Function(...argumentsArr, `return ${functionBody.value}`);

  const newOperation = new Operation(functionSymbol.value, +functionPrecedence.value, newOperationFunction);

  const observer = new Observer().getInstance();

  observer.notify(events.VIEW_ADD_NEW_OPERATION, newOperation);
};
