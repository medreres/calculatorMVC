import { HISTORY_SIZE } from "../../../config";
import { IConstant, IOperation } from "../../../shared/interfaces";
import { buildUrl } from "../../../utils/buildUrl";

//TODO declare interface for environment variables
export function fetchHistory(limit?: number): Promise<IOperation[]> {
  const url = buildUrl("/expressions", process.env.BASE_URL!, {
    limit: (limit || HISTORY_SIZE).toString(),
  });

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) => data);
}

export function fetchOperationsSymbols(): Promise<string[]> {
  // make uniform interface for all symbols to work easier
  return Promise.all([
    fetch(buildUrl("/operations", process.env.BASE_URL!))
      .then((response) => response.json())
      .then(({ data }) => data),

    // we only need name of those constants
    fetch(buildUrl("/constants", process.env.BASE_URL!))
      .then((response) => response.json())
      .then(({ data }) => data.map((constant: IConstant) => constant.key)),
  ]).then((response) => response.flat());
}

export function fetchResult(expression: string) {
  const url = buildUrl("/evaluate", process.env.BASE_URL!);
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expression }),
  })
    .then((response) => response.json())
    .then(({ data, error }) => ({ data, error }));
}
