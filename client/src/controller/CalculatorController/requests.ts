import { BASE_URL } from "../../config";
import { IConstant, IOperation } from "../../shared/interfaces";
import { buildUrl } from "../../utils/buildUrl";

export function fetchHistory(): Promise<IOperation[]> {
  const url = buildUrl("/last-operations", BASE_URL);

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) => data);
}

export function fetchOperationsSymbols(): Promise<string[]> {
  // make uniform interface for all symbols to work easier
  return Promise.all([
    fetch(buildUrl("/operations", BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data),

    // we only need name of those constants
    fetch(buildUrl("/constants", BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data.map((constant: IConstant) => constant.key)),
  ]).then((response) => response.flat());
}
