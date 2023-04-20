import { AttributeKeys, WithId } from "@/libs/Db";

type Condition<T> = T | T[];

export type Filter<T> = {
  [P in keyof T]?: Condition<WithId<T>[P]>;
} & RootFilterOperators<T>;

type RootFilterOperators<T> = {
  [AttributeKeys.OR]?: Filter<T>[];
};

export type ReplaceAttributes<T> = Partial<T>;

export type SortingValue = "asc" | "desc";
type ISort<T> = {
  [P in keyof T]: SortingValue;
};

export interface IAggregator<T> {
  limit(value: number): IAggregator<T>;
  skip(value: number): IAggregator<T>;
  sort(value: ISort<T>): IAggregator<T>;
  exec(): Promise<T[]>;
}

export interface IGetExpressions {
  skip?: number;
  sort?: string;
  limit?: number;
}
