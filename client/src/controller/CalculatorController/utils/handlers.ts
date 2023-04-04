import CalculatorController from "..";
import { BASE_URL } from "../../../config";
import { Events } from "../../../shared/events";
import { buildUrl } from "../../../utils/buildUrl";

export function calculateRequestHandler(this: CalculatorController, value: string) {
  const url = buildUrl("/evaluate", BASE_URL, {
    expression: value,
  });

  return fetch(url, {
    method: "POST",
  })
    .then((response) => response.json())
    .then(({ data, error }) => {
      if (!isNaN(data)) {
        this.notify(Events.MODEL_CALCULATED, data as number);
        this.notify(Events.VIEW_SET_RESULT, data as number);
        return;
      }

      return this.notify(Events.MODEL_INVALID_INPUT, error);
    });
}
