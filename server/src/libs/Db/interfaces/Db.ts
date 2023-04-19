import { DefaultProperties, IStaticDocument } from "./Document";

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

  // TODO any?
  model<T extends DefaultProperties>(name: string, schema: any): IStaticDocument<T>;
}
