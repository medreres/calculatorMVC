import { IOperation, ModelEvents } from "@/shared";
import CalculatorModel from "..";

export function modelCalculatedHandler(this: CalculatorModel, data: string) {
  const history: IOperation = {
    expression: this.getExpression(),
    result: data,
  };

  this.notify(ModelEvents.ADD_HISTORY, history);

  this.setExpression(data);
}

export function historyFetchedHandler(this: CalculatorModel, data: IOperation[]) {
  this.operationsHistory = data;

  this.notify(ModelEvents.RENDER_HISTORY, data);
}

export function addHistoryHandler(this: CalculatorModel, data: IOperation) {
  this.addHistory(data);

  this.notify(ModelEvents.RENDER_HISTORY, this.getHistory());
}
