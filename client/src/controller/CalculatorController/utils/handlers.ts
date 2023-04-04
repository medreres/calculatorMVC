import CalculatorController from "..";
import { Events } from "../../../shared/events";
import { fetchResult } from "./requests";

export function calculateRequestHandler(this: CalculatorController, value: string) {
  fetchResult(value).then(({ data, error }) => {
    if (!isNaN(data)) {
      this.notify(Events.MODEL_CALCULATED, data as number);
      this.notify(Events.VIEW_SET_INPUT, data as number);
      return;
    }

    return this.notify(Events.MODEL_INVALID_INPUT, error);
  });
}
