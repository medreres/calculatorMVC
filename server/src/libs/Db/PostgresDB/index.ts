import { DefaultProperties, IAggregator, IDocument, SortAttribute, WithId, WithoutId } from "../interfaces";
import knex, { Knex } from "knex";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
import { defaultProperties } from "../utils";
import { QUERY_LIMIT } from "../config";

// @staticImplements<IStaticDb>()
export default class PostgresDB {
  static client: Knex<any, unknown[]>;
  protected collectionName: string;

  private constructor(collection: string) {
    this.collectionName = collection;
  }

  // private getCollection<TSchema extends Document>() {
  //   return MongoDB.client!.db(DB_NAME).collection<TSchema>(this.collectionName);
  // }

  public static connect(uri: string) {
    const instance = knex({
      client: "pg",
      connection: uri,
      searchPath: ["knex", "public"],
    });

    return instance.raw("select 1+1 as result").then(() => {
      PostgresDB.client = instance;
    });
  }

  protected getCollection<T extends {}>() {
    return PostgresDB.client<T>(this.collectionName);
  }

  // static disconnect() {
  //   return Promise.resolve(() => {
  //     PostgresDB.client;
  //   });
  // }

  insertOne<T extends DefaultProperties>(data: T) {
    return this.getCollection().insert(data);
  }

  // private insertMany(data: DefaultPropertiesWithoutId[]) {
  //   return this.getCollection().insertMany(data);
  // }

  // private updateOne<T extends Document>(data: Partial<T>, newData: UpdateFilter<T>) {
  //   return Promise.resolve();
  // }

  // // TODO
  // private deleteOne<T extends Document>(data: Partial<T>) {
  //   return Promise.resolve();
  // }

  // private deleteMany<T extends Document>(data: Partial<T>) {
  //   return Promise.resolve();
  // }

  findOne<T extends Document>(data: Partial<T>) {
    return this.getCollection().select();
  }

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
          console.log(key, value);
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

    let tableInitialized = false;

    // create table is not exist yet
    // TODO to utils function
    const initializeTable = async () => {
      // PostgresDB.client.schema.dropTable('Expressions')
      PostgresDB.client.schema.hasTable(collectionName).then((hasTable) => {
        if (hasTable) {
          tableInitialized = true;
          return;
        }

        const properties = getProperties(validator);

        return PostgresDB.client.schema
          .createTable(collectionName, (table) => {
            table.increments("id");

            Object.entries(properties).forEach(([key, value]) => {
              let mainAttribute;

              if (value.type === "string") {
                mainAttribute = table.string(key);
              } else if (value.type === "number") {
                mainAttribute = table.double(key);
              } else if (value.type === "date-time") {
                mainAttribute = table.date(key);
              }

              if (value.default) {
                mainAttribute?.defaultTo(value.default);
              }
            });
          })
          .then(() => (tableInitialized = true));
      });
    };

    // TODO create table if not exist

    // @staticImplements<IStaticDocument<IModelWithoutId>>()
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
        // save data
      }

      save() {
        // TODo type casting
        if (!tableInitialized) {
          initializeTable().then(() => {
            return Document.getCollection().insert(this.attributes as any);
          });
        }
        return Document.getCollection().insert(this.attributes as any);
      }

      static create(params: Attributes) {
        if (!tableInitialized) {
          initializeTable().then(() => {
            const instance = new Document(params);
            return instance.save();
          });
        }
        const instance = new Document(params);
        return instance.save();
      }

      static updateOne(params: Partial<Attributes>, updateFields: Partial<Attributes>) {
        // not implemented
        if (!tableInitialized) {
          initializeTable().then(() => {
            return Document.getCollection()
              .where(params)
              .update(updateFields as any);
          });
        }
        return Document.getCollection()
          .where(params)
          .update(updateFields as any);
      }

      static insertOne(data: IModelWithoutId) {
        // TODO type casting
        if (!tableInitialized) {
          initializeTable().then(() => {
            return Document.getCollection().insert(data as any);
          });
        }
        return Document.getCollection().insert(data as any);
      }

      static findOne(params: Partial<Attributes>) {
        if (!tableInitialized) {
          initializeTable().then(() => {
            return Document.getCollection()
              .where(params)
              .then((result) => result[0]);
          });
        }

        return Document.getCollection()
          .where(params)
          .then((result) => result[0]);
      }

      static findMany(params: Partial<Attributes>) {
        if (!tableInitialized) {
          initializeTable().then(() => {
            return this.collectionRef.findMany<IModelWithId>(params);
          });
        }

        return this.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: Partial<Attributes>) {
        if (!tableInitialized) {
          initializeTable().then(() => {
            return Document.getCollection().where(params);
          });
        }

        return Promise.resolve();
      }

      static deleteMany(params: Partial<Attributes>) {
        return Promise.resolve();
      }
    }

    return Document;
  }
}

// utility
type IProperties<T> = {
  [P in keyof T]: {
    type: T[P];
    required?: boolean;
    default?: T[P];
  };
};
function getProperties<T extends z.AnyZodObject>(schema: T) {
  const keys: IProperties<T> = (zodToJsonSchema(schema) as any).properties;

  return keys;
}

type InferType<T extends z.AnyZodObject> = z.infer<T> & { [key: string]: any };
