import { SortAttribute } from "./Document";

// TODO sort by id?
export interface IAggregator<T> {
  limit(value: number): IAggregator<T>;
  skip(value: number): IAggregator<T>;
  sort(value: SortAttribute<T>): IAggregator<T>;

  exec(): Promise<any[]>;
}
