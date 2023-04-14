import { AttributeKeys, FilterOperators, WithId } from "@/libs/Db";

export interface IStaticDocumentService<T> {
  // TODO interface for params
  findOne(param: Filter<T>): Promise<T | null>;
  updateOne(param: Filter<T>, updateFields: any): any;
  create(attributes: any): any;
  findMany(attributes?: Filter<T>): any;
  deleteMany(attributes: Filter<T>): any;
}

// TODO remove type dependency
type Condition<T> = FilterOperators<T> | T;

export type Filter<T> =
  | {
      [P in keyof T]?: Condition<WithId<T>[P]>;
    }
  | RootFilterOperators<T>;

type RootFilterOperators<T> = {
  [AttributeKeys.OR]: Filter<T>[];
  [AttributeKeys.NOR]: Filter<T>[];
  [AttributeKeys.AND]: Filter<T>[];
};

export type ReplaceAttributes<T> = {
  [AttributeKeys.SET]: Partial<T>;
};
