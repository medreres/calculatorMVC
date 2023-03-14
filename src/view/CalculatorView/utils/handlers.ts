import { events } from "../../../shared/config";
import { Actions } from "../config";
import { Operation, Operations } from "../../../lib/Calculator";
import CalculatorView from "../CalculatorView";

export const btnClickHandler = (btnValue: string, viewInstance: CalculatorView): (() => void) => {
  let handler;

  if (btnValue === Actions.CALCULATE) {
    handler = () => {
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

// TODO could be removed
// export const addFunctionHandler = (viewInstance: CalculatorView) => {
//   return (e: Event) => {
//     e.preventDefault();

//     const functionBody = document.querySelector("#functionBody") as HTMLInputElement;
//     const functionArguments = document.querySelector("#functionArguments") as HTMLInputElement;
//     const functionPrecedence = document.querySelector("#functionPrecedence") as HTMLInputElement;
//     const functionSymbol = document.querySelector("#functionSymbol") as HTMLInputElement;

//     if (!isNaN(+functionSymbol.value)) return alert("Function symbol must not be a number");

//     const newOperationFunction = new Function(...functionArguments.value.split(","), `${functionBody.value}`);
//     const newOperation = new Operation(functionSymbol.value, +functionPrecedence.value, newOperationFunction);

//     viewInstance.notify(events.VIEW_ADD_NEW_OPERATION, newOperation);
//   };
// };
