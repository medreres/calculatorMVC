import knex, { Knex } from "knex";
import { z } from "zod";

import { initializeTable } from "./utils";
import { QUERY_LIMIT } from "../config";
import {
  AttributeKeys,
  DefaultProperties,
  defaultProperties,
  Document,
  FilterOptions,
  IAggregator,
  IDocument,
  SortAttribute,
  WithId,
  WithoutId,
} from "../interfaces";

export default class PostgresDB {
  static client: Knex<Document, unknown[]>;
  protected collectionName: string;

  private constructor(collection: string) {
    this.collectionName = collection;
  }

  public static connect(uri: string) {
    const instance = knex({
      client: "pg",
      connection: uri,
      searchPath: ["knex", "public"],
    });

    PostgresDB.client = instance;
    return Promise.resolve();
  }

  protected static getClient<T extends Document>(collectionName: string) {
    if (!PostgresDB.client) {
      throw new Error("Database is not connected.");
    }

    return PostgresDB.client<T>(collectionName);
  }

  protected getCollection<T extends DefaultProperties>() {
    return PostgresDB.getClient<T>(this.collectionName);
  }

  static disconnect() {
    return Promise.resolve();
  }

  private insertOne<T extends DefaultProperties>(data: T) {
    return this.getCollection()
      .insert(data, ["id"])
      .then((result) => {
        return result[0].id;
      });
  }

  private updateOne<T extends DefaultProperties>(params: FilterOptions<T>, updateFields: Partial<T>) {
    return this.getCollection()
      .where(params)
      .update(updateFields)
      .then((r) => Boolean(r));
  }

  private deleteOne<T extends Document>(data: FilterOptions<T>) {
    return this.getCollection()
      .where(data)
      .limit(1)
      .delete()
      .then((r) => Boolean(r));
  }

  private deleteMany<T extends Document>(data: FilterOptions<T>) {
    return this.getCollection()
      .where(data)
      .delete()
      .then((result) => result);
  }

  //? should be recursive in case of nested queries}
  //? like {or: [{expression: ['1+2', '3], {result: 3}}
  private findOne<T extends DefaultProperties>(params: FilterOptions<T>) {
    const query = this.getCollection<T>();

    Object.entries(params).forEach(([key, value]) => {
      if (key === AttributeKeys.OR && Array.isArray(value)) {
        value.forEach((attribute, index) => {
          Object.entries(attribute).forEach(([key, value]) => {
            if (index === 0) {
              query.where({
                [key]: value,
              });
            } else {
              query.orWhere({
                [key]: value,
              });
            }
          });
        });
      } else if (Array.isArray(value)) {
        query.whereIn(key, value);
      } else {
        query.where(key, value);
      }
    });

    return query.then((result) => result[0]);
  }

  private findMany<T extends DefaultProperties>(params: FilterOptions<T>) {
    const collection = this.getCollection<T>();

    class Aggregator implements IAggregator<WithId<T>> {
      collection;

      constructor() {
        this.collection = collection;
        this.collection.limit(QUERY_LIMIT);
      }

      limit(value: number) {
        this.collection.limit(value);
        return this;
      }

      skip(value: number) {
        this.collection.offset(value);
        return this;
      }

      sort(params: SortAttribute<Partial<T>>) {
        Object.entries(params).map(([key, value]) => {
          this.collection.orderBy(key, value as string);
        });

        return this;
      }

      exec() {
        return this.collection.select().where(params);
      }
    }

    return new Aggregator();
  }

  static model<T extends z.AnyZodObject>(collectionName: string, schema: T) {
    type Attributes = z.infer<typeof schema>;
    type IModelWithId = WithId<Attributes> & DefaultProperties;
    type IModelWithoutId = Attributes & DefaultProperties;
    const validator = schema.merge(defaultProperties);

    // initialize table
    setImmediate(initializeTable.bind(null, collectionName, validator));

    class Document implements IDocument<IModelWithoutId> {
      private static collectionRef = new PostgresDB(collectionName);
      attributes: WithoutId<Attributes & DefaultProperties>;

      constructor(params: Attributes) {
        this.attributes = validator.parse(params) as IModelWithoutId;
      }

      save() {
        return Document.collectionRef.insertOne(this.attributes);
      }

      static create(params: Attributes) {
        const instance = new Document(params);
        return instance.save();
      }

      static updateOne(params: FilterOptions<IModelWithId>, updateFields: Partial<Attributes>) {
        return this.collectionRef.updateOne(params, updateFields);
      }

      static insertOne(data: IModelWithoutId) {
        return this.collectionRef.insertOne(data);
      }

      static findOne(params: FilterOptions<IModelWithId>) {
        return this.collectionRef.findOne(params);
      }

      static findMany(params: FilterOptions<IModelWithId>) {
        return this.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: FilterOptions<IModelWithId>) {
        return this.collectionRef.deleteOne(params);
      }

      static deleteMany(params: FilterOptions<IModelWithId>) {
        return this.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
