import {  ModelEvents, ViewEvents } from "@/shared";
import CalculatorController from "..";
import { fetchResult } from "./requests";

export function calculateRequestHandler(this: CalculatorController, value: string) {
  fetchResult(value).then(({ data, error }) => {
    if (!isNaN(data)) {
      this.notify(ModelEvents.CALCULATED, data);
      this.notify(ViewEvents.SET_INPUT, data);
      return;
    }

    return this.notify(ModelEvents.INVALID_INPUT, error);
  });
}
