import { SortAttribute } from "../MongoDB/interfaces";

// TODO sort by id?
export interface IAggregator<T> {
  limit(value: number): IAggregator<T>;
  skip(value: number): IAggregator<T>;
  sort(value: SortAttribute<T>): IAggregator<T>;

  // TODO to array
}
