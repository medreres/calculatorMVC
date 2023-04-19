import { z } from "zod";
import { IStaticDocument } from "./Document";

export enum AttributeKeys {
  LIMIT = "limit",
  SORT = "sort",
  SKIP = "skip",
  IN = "in",
  GT = "gt",
  LT = "lt",
  AND = "and",
  OR = "or",
  NOR = "nor",
  SET = "set",
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export interface IStaticDb {
  connect(url: string): Promise<any>;

  disconnect(): Promise<void>;

  model<T extends z.AnyZodObject>(name: string, schema: T): IStaticDocument<z.infer<T>>;
}
