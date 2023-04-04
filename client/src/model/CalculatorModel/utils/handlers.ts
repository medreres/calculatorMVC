import CalculatorModel from "..";
import { Events } from "../../../shared/events";
import { IOperation } from "../../../shared/interfaces";

export function modelCalculatedHandler(this: CalculatorModel, data: string) {
  const history: IOperation = {
    expression: this.getExpression(),
    result: data,
    timestamp: new Date(),
  };

  this.notify(Events.MODEL_ADD_HISTORY, history);

  this.setExpression(data);
}

export function historyFetchedHandler(this: CalculatorModel, data: IOperation[]) {
  this.operationsHistory = data;

  this.notify(Events.MODEL_RENDER_HISTORY, data);
}

export function addHistoryHandler(this: CalculatorModel, data: IOperation) {
  this.addHistory(data);

  this.notify(Events.MODEL_RENDER_HISTORY, this.getHistory());
}
