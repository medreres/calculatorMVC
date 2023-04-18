// import { z } from "zod";
import { DefaultProperties, IStaticDocument } from "./Document";

export enum AttributeKeys {
  LIMIT = "$limit",
  SORT = "$sort",
  SKIP = "$skip",
  IN = "$in",
  GT = "$gt",
  LT = "$lt",
  AND = "$and",
  OR = "$or",
  NOR = "$nor",
  SET = "$set",
  ID = "id", // TODO deal with id at mongo and postgress simultaneously
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export interface IDb {
  //   connect: (url: string) => Promise<any>;
}

// interface for static methods
export interface IStaticDb {
  new (collection: string): IDb;

  connect(url: string): Promise<any>;

  disconnect(): Promise<void>;

  // TODO any?
  model<T extends DefaultProperties>(name: string, schema: any): IStaticDocument<T>;
}
