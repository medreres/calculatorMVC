import knex, { Knex } from "knex";
import {
  AttributeKeys,
  defaultProperties,
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
import { QUERY_LIMIT } from "../config";
import { initializeTable } from "./utils";

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

  protected getCollection<T extends DefaultProperties>() {
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

  private findMany<T extends DefaultProperties>(params: FilterOptions<T>) {
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
    type Attributes = z.infer<typeof schema>;
    type IModelWithId = WithId<Attributes> & DefaultProperties;
    type IModelWithoutId = Attributes & DefaultProperties;
    const validator = schema.merge(defaultProperties);

    setImmediate(initializeTable.bind(null, collectionName, validator));

    @staticImplements<IStaticDocument<IModelWithoutId>>()
    class Document implements IDocument<IModelWithoutId> {
      private static collectionRef = new PostgresDB(collectionName);
      attributes: WithoutId<Attributes & DefaultProperties> & {};

      private static getCollection<T extends DefaultProperties>() {
        return Document.collectionRef.getCollection<T>();
      }

      constructor(params: Attributes) {
        // parse data
        // TODO type casting
        this.attributes = validator.parse(params) as IModelWithoutId;
      }

      save() {
        // TODo type casting
        return Document.getCollection()
          .insert(this.attributes, ["id"])
          .then((result) => {
            return (result[0] as any).id;
          });
      }

      static create(params: Attributes) {
        const instance = new Document(params);
        return instance.save();
      }

      static updateOne(params: FilterOptions<IModelWithId>, updateFields: Partial<Attributes>) {
        return Document.getCollection()
          .where(params)
          .update(updateFields)
          .then((r) => Boolean(r));
      }

      static insertOne(data: IModelWithoutId) {
        // TODO type casting
        return Document.getCollection()
          .insert(data)
          .then((result) => (result[0] as any).id as string);
      }

      //? should be recursive in case of nested queries
      static findOne(params: FilterOptions<IModelWithId>) {
        let query = Document.getCollection<IModelWithId>();

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

        // TODO type casting
        return query.then((result: any) => result[0] as Promise<IModelWithId | null>);
      }

      static findMany(params: FilterOptions<IModelWithId>) {
        return this.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: FilterOptions<IModelWithId>) {
        return Document.getCollection()
          .where(params)
          .limit(1)
          .delete()
          .then((r) => Boolean(r));
      }

      static deleteMany(params: FilterOptions<IModelWithId>) {
        return Document.getCollection()
          .where(params)
          .delete()
          .then((result) => result);
      }
    }

    return Document;
  }
}
