import { ObjectId } from "mongodb";

export type Id = {
  _id: ObjectId;
};

export type Types = number | string | Date;

export type Attributes = Id;

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
