import { IConstant, IOperation } from "../../../shared/interfaces";
import { buildUrl } from "../../../utils/buildUrl";

//TODO declare interface for environment variables
export function fetchHistory(): Promise<IOperation[]> {
  const url = buildUrl("/last-operations", process.env.BASE_URL!);

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
  const url = buildUrl("/evaluate", process.env.BASE_URL!, {
    expression,
  });

  return fetch(url, {
    method: "POST",
  })
    .then((response) => response.json())
    .then(({ data, error }) => ({ data, error }));
}
