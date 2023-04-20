import { HISTORY_SIZE } from "@/config";
import { IConstant, IOperation } from "@/shared";

export function fetchHistory(limit?: number): Promise<IOperation[]> {
  const url = buildUrl("/expressions", process.env.BASE_URL, {
    limit: (limit || HISTORY_SIZE).toString(),
    sort: "updatedAt:desc",
  });

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) => data);
}

export function fetchOperationsSymbols(): Promise<string[]> {
  // make uniform interface for all symbols to work easier
  return Promise.all([
    fetch(buildUrl("/operations", process.env.BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data),

    // we only need name of those constants
    fetch(buildUrl("/constants", process.env.BASE_URL))
      .then((response) => response.json())
      .then(({ data }) => data.map((constant: IConstant) => constant.key)),
  ]).then((response) => response.flat());
}

export function fetchResult(expression: string) {
  const url = buildUrl("/expression", process.env.BASE_URL);

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expression }),
  })
    .then((response) => response.json())
    .then(({ data, error }) => ({ data, error }));
}

interface IParams {
  [key: string]: string;
}
export function buildUrl(url: string, base: string, params?: IParams): URL {
  const buildUrl = new URL(url, base);
  if (params)
    Object.entries(params).forEach(([key, value]: [string, string | string[]]) => {
      if (!value) return;

      if (Array.isArray(value)) return buildUrl.searchParams.append(key, value.join(","));

      buildUrl.searchParams.append(key, value.toString());
    });
  return buildUrl;
}
