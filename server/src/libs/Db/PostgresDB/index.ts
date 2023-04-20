import knex, { Knex } from "knex";
import { z } from "zod";

import { buildQuery, initializeTable } from "./utils";
import { QUERY_LIMIT } from "../config";
import {
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
    const query = this.getCollection();
    buildQuery(query, params);
    return query.update(updateFields).then((r) => Boolean(r));
  }

  private deleteOne<T extends Document>(data: FilterOptions<T>) {
    const query = this.getCollection();
    buildQuery(query, data);
    return query
      .limit(1)
      .delete()
      .then((r) => Boolean(r));
  }

  private deleteMany<T extends Document>(data: FilterOptions<T>) {
    const query = this.getCollection();
    buildQuery(query, data);
    return query
      .where(data)
      .delete()
      .then((result) => result);
  }

  //TODO should be recursive in case of nested queries}
  //? like {or: [{expression: ['1+2', '3], {result: 3}}
  private findOne<T extends DefaultProperties>(params: FilterOptions<T>) {
    const query = this.getCollection<T>();
    buildQuery(query, params);

    return query.then((result) => result[0]);
  }

  private findMany<T extends DefaultProperties>(params: FilterOptions<T>) {
    const collection = this.getCollection<T>();
    buildQuery(collection, params);

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
          this.collection.orderBy(key, value);
        });

        return this;
      }

      exec() {
        return this.collection.select();
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
