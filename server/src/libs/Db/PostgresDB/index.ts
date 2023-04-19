import knex, { Knex } from "knex";
import {
  AttributeKeys,
  DefaultProperties,
  FilterOptions,
  IAggregator,
  IDocument,
  IStaticDb,
  IStaticDocument,
  SortAttribute,
  staticImplements,
  WithId,
  WithoutId,
} from "../interfaces";
import { z } from "zod";
import { defaultProperties } from "../utils";
import { QUERY_LIMIT } from "../config";
import { InferType, initializeTable } from "./utils";

@staticImplements<IStaticDb>()
export default class PostgresDB {
  static client: Knex<any, unknown[]>;
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

  protected getCollection<T extends {}>() {
    return PostgresDB.client<T>(this.collectionName);
  }

  // TODO crutches
  static disconnect() {
    return Promise.resolve();
  }

  // private insertOne<T extends DefaultProperties>(data: T) {
  //   return this.getCollection().insert(data);
  // }

  // // private insertMany(data: DefaultPropertiesWithoutId[]) {
  // //   return this.getCollection().insertMany(data);
  // // }

  // // private updateOne<T extends Document>(data: Partial<T>, newData: UpdateFilter<T>) {
  // //   return Promise.resolve();
  // // }

  // // // TODO
  // // private deleteOne<T extends Document>(data: Partial<T>) {
  // //   return Promise.resolve();
  // // }

  // // private deleteMany<T extends Document>(data: Partial<T>) {
  // //   return Promise.resolve();
  // // }

  // // private findOne<T extends Document>(data: Partial<T>) {
  // //   return this.getCollection().select().where(data);
  // // }

  private findMany<T extends DefaultProperties>(params: Partial<T>) {
    const collection = this.getCollection<T>();

    class Aggregator implements IAggregator<WithId<T>> {
      collection;

      constructor() {
        this.collection = collection;
        // set default limit
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
    type Attributes = InferType<typeof schema>;

    const validator = schema.merge(defaultProperties);

    type IModelWithId = WithId<Attributes & DefaultProperties>;
    type IModelWithoutId = WithoutId<Attributes & DefaultProperties>;

    setImmediate(initializeTable.bind(null, collectionName, validator));

    // TODO create table if not exist

    @staticImplements<IStaticDocument<IModelWithoutId>>()
    class Document implements IDocument<IModelWithoutId> {
      attributes: WithoutId<Attributes & DefaultProperties> & {};
      private static collectionRef = new PostgresDB(collectionName);

      private static getCollection() {
        return Document.collectionRef.getCollection<IModelWithId>();
      }

      constructor(params: Attributes) {
        // parse data
        // TODO type casting
        this.attributes = validator.parse(params) as IModelWithoutId;
      }

      save() {
        // TODo type casting
        return Document.getCollection().insert(this.attributes as any);
      }

      static create(params: Attributes) {
        const instance = new Document(params);
        return instance.save();
      }

      static updateOne(params: Partial<Attributes>, updateFields: Partial<Attributes>) {
        return Document.getCollection()
          .where(params)
          .update(updateFields as any);
      }

      static insertOne(data: IModelWithoutId) {
        // TODO type casting
        return Document.getCollection().insert(data as any);
      }

      //? should be recursive in case of nested queries
      static findOne(params: FilterOptions<Attributes>) {
        let query = Document.getCollection();

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
            /**
             * value = [
             * {expression: '1+5'}
             * ]
             */
          } else if (Array.isArray(value)) {
            query.whereIn(key, value);
          } else {
            query.where(key, value);
          }
        });

        return query.then((result) => result[0]);
        // return Document.getCollection()
        //   .where(params)
        //   .then((result) => result[0]);
      }

      static findMany(params: Partial<Attributes>) {
        return this.collectionRef.findMany<IModelWithId>(params);
      }

      // TODO
      static deleteOne(params: Partial<Attributes>) {
        return Document.getCollection().where(params);
      }

      // TODO
      static deleteMany(params: Partial<Attributes>) {
        return Document.getCollection()
          .where(params)
          .delete()
          .then((result) => result);
      }
    }

    return Document;
  }
}
