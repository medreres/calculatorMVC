import { ObjectId } from "mongodb";
import { CREATED_AT, UPDATED_AT } from "./config";

// default properties for abstract model
export type DefaultProperties = {
  _id?: ObjectId;

  [CREATED_AT]: Date;
  [UPDATED_AT]: Date;
};

export type DefaultQueryProperties = Partial<DefaultProperties>;

export type queryParams<T> = {
  $in?: T[];
  $gt?: T;
  $lt?: T;
};

// allows to search using logical OR statement
export type Or<T> = {
  $or?: Partial<GenericInterface<T>>[];
};

export type GenericInterface<T> = T | queryParams<T>;

export const LIMIT_ATTRIBUTE = "$limit";
export const SORT_ATTRIBUTE = "$sort";
export const SKIP_ATTRIBUTE = "$skip";
export type AggregationAttributes<T> = {
  [LIMIT_ATTRIBUTE]?: number;
  [SORT_ATTRIBUTE]?: {
    [Property in keyof T]?: 1 | -1;
  };
  [SKIP_ATTRIBUTE]?: number;
};

export type ReplaceAttributes<T> = {
  $set: Partial<T>;
};

export type QueryAttributes<T> = Partial<T & DefaultProperties & Or<T>>;
