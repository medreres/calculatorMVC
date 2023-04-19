import { ObjectId } from "mongodb";
import { IAggregator } from "./Aggregator";
import { AttributeKeys } from "./Db";

// TODO from mongodb
export interface IDocument<T> {
  attributes: WithoutId<T>;

  save(): Promise<any>;
}

// TODO correct any types
export interface IStaticDocument<T extends DefaultProperties> {
  // constructor interface
  new (params: T): IDocument<T>;

  // TODO types
  create(params: T): Promise<any>;
  updateOne(params: FilterOptions<WithId<T>>, aby1: any): any;
  findOne(params: FilterOptions<WithId<T>>): Promise<any>;
  insertOne(attributes: T): Promise<any>;
  deleteMany(params: FilterOptions<WithId<T>>): Promise<any>;
  deleteOne(params: FilterOptions<WithId<T>>): Promise<any>;
  findMany(params: FilterOptions<WithId<T>>): IAggregator<WithId<T>>;
}

export type WithoutId<T> = DefaultProperties & T;
export type WithId<T> = T & {
  [AttributeKeys.ID]: ObjectId;
};

// TODO single source of truth
// default properties for abstract model
export type DefaultProperties = {
  [AttributeKeys.CREATED_AT]: Date;
  [AttributeKeys.UPDATED_AT]: Date;
};

// export type DefaultPropertiesWittId = Omit<DefaultPropertiesWithId, typeof ID>;

export type FilterOperators<T> = {
  // [AttributeKeys.IN]?: T[];
  [AttributeKeys.GT]?: T;
  [AttributeKeys.LT]?: T;
};

export type SortingValue = "asc" | "desc";
export type SortAttribute<T> = {
  [Property in keyof T]: SortingValue;
};

// interface for aggregating results
// allows use of $limit, $sort and etc.
export type AggregationAttributes<T> = {
  [AttributeKeys.LIMIT]?: number;

  // -1|1 ensures that sorting occurs either ascending or descending
  [AttributeKeys.SORT]?: SortAttribute<T>;

  [AttributeKeys.SKIP]?: number;
};

// interface for data to replace the old one
export type ReplaceAttributes<T> = Partial<T>;

export type RootFilterOperators<T> = {
  [AttributeKeys.AND]?: FilterOptions<T>[];

  [AttributeKeys.NOR]?: FilterOptions<T>[];

  [AttributeKeys.OR]?: FilterOptions<T>[];
};

export type Condition<T> = FilterOperators<T> | T | T[];

export type FilterOptions<T> = {
  [P in keyof T]?: Condition<WithId<T>[P]>;
} & RootFilterOperators<T>;
