import { ObjectId } from "mongodb";
import { CREATED_AT, ID, UPDATED_AT } from "./config";

// default properties for abstract model
export type DefaultProperties = {
  [ID]: ObjectId;

  [CREATED_AT]?: Date;
  [UPDATED_AT]?: Date;
};

export type DefaultPropertiesWithoutId = Omit<DefaultProperties, typeof ID>;

export type QueryParams<T> = {
  $in?: T[];
  $gt?: T;
  $lt?: T;
};

// interface for declaring schema for model
export type GenericInterface<T> = T | QueryParams<T>;

// allows to search using logical OR statement
export type Or<T> = {
  $or?: Partial<GenericInterface<T>>[];
};

// properties for aggregation
export const LIMIT_ATTRIBUTE = "$limit";
export const SORT_ATTRIBUTE = "$sort";
export const SKIP_ATTRIBUTE = "$skip";

// interface for aggregating results
// allows use of $limit, $sort and etc.
export type AggregationAttributes<T> = {
  [LIMIT_ATTRIBUTE]?: number;

  // -1|1 ensures that sorting occurs either ascending or descending
  [SORT_ATTRIBUTE]?: { [Property in keyof T]?: 1 | -1 };

  [SKIP_ATTRIBUTE]?: number;
};

// interface for data to replace the old one
export type ReplaceAttributes<T> = {
  $set: Partial<T>;
};

// interface for querying db
// allows use of $or, $in, $gt and etc.
export type QueryAttributes<T> = Partial<T & DefaultProperties & Or<T>>;
