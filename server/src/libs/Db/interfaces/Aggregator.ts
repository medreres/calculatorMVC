import { DefaultProperties, SortAttribute } from "./Document";

export interface IAggregator<T extends DefaultProperties> {
  limit(value: number): IAggregator<T>;
  skip(value: number): IAggregator<T>;
  sort(value: SortAttribute<T>): IAggregator<T>;

  exec(): Promise<any[]>;
}
