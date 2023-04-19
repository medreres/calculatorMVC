import { z } from "zod";

import { IAggregator } from "./Aggregator";
import { AttributeKeys } from "./Db";
import { CREATED_AT, UPDATED_AT } from "../config";
import { InferType } from "../PostgresDB/utils";

export interface IDocument<T> {
  attributes: WithoutId<T>;

  /**
   * returns id of saved document
   */
  save(): Promise<string>;
}

export interface IStaticDocument<T> {
  new (params: T): IDocument<T>;

  // Creation
  /**
   *
   * @param params Attributes needed for constructor to create document and save
   */
  create(params: T): Promise<string>;

  /**
   *
   * @param params Attributes essential for document to be in database
   */
  insertOne(attributes: T): Promise<string>;

  // Update
  updateOne(
    params: FilterOptions<WithId<T>>,
    replaceAttributes: Partial<WithoutId<T & DefaultProperties>>
  ): Promise<boolean>;

  // Read
  findOne(params: FilterOptions<WithId<T>>): Promise<WithId<T & DefaultProperties> | null>;
  findMany(params: FilterOptions<WithId<T>>): IAggregator<WithId<T & DefaultProperties>>;

  // Delete
  /**
   *
   * @return {Promise<number>} number of documents deleted
   */
  deleteMany(params: FilterOptions<WithId<T>>): Promise<number>;
  deleteOne(params: FilterOptions<WithId<T>>): Promise<boolean>;
}

export type WithoutId<T> = DefaultProperties & T;

export type WithId<T> = T & {
  [AttributeKeys.ID]: string;
};

// default properties for abstract model
export const defaultProperties = z.object({
  [CREATED_AT]: z.date().default(new Date()),
  [UPDATED_AT]: z.date().default(new Date()),
});
export type DefaultProperties = InferType<typeof defaultProperties>;

export type SortingValue = "asc" | "desc";
export type SortAttribute<T> = {
  [Property in keyof T]: SortingValue;
};

// interface for data to replace the old one
export type ReplaceAttributes<T> = Partial<T>;

export type RootFilterOperators<T> = {
  [AttributeKeys.OR]?: FilterOptions<T>[];
};

export type Condition<T> = T | T[];

export type FilterOptions<T> = {
  [P in keyof T]?: Condition<WithId<T>[P]>;
} & RootFilterOperators<T>;

export type Document = {
  [key: string]: any;
};

export type OptionalIdUnlessRequired<T> = T extends { id: string } ? T : WithId<T>;
