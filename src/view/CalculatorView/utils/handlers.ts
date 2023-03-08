import Observer from "../../../lib/Observer";
import ICalculatorView from "../../interface";

export const btnClickHandler = (btnValue: string, viewInstance: ICalculatorView, observer: Observer) => {
  if (btnValue === "=")
    return () => {
      observer.notify("calculate", btnValue);
    };
  else if (btnValue == "AC")
    return () => {
      observer.notify("clearExpressionInput");
      viewInstance.setExpression("");
      viewInstance.setResult("");
    };
  else {
    return (e: any) => {
      const data = e.target.innerHTML;
      const isNumber = !isNaN(+data) || data === ".";
      // if its a number or a dot, then dont add any spaces, in other case add spaces on both sides
      const expression = `${viewInstance.getExpression()}${isNumber ? "" : " "}${data}${isNumber ? "" : " "}`;
      viewInstance.setExpression(expression);
      observer.notify("expressionInputChange", expression);
    };
  }
};
