import { Filter, MongoClient, OptionalUnlessRequiredId, UpdateFilter } from "mongodb";
import { z } from "zod";

import { preformatData, formatResponse } from "./utils";
import { QUERY_LIMIT } from "../config";
import { DB_NAME } from "../config/attributes";
import {
  DefaultProperties,
  Document,
  FilterOptions,
  IAggregator,
  ReplaceAttributes,
  SortAttribute,
  WithId,
  WithoutId,
  defaultProperties,
  IDocument,
} from "../interfaces";
import { InferType } from "../PostgresDB/utils";

export * from "../config";

export default class MongoDB {
  protected static client: MongoClient | null = null;
  protected collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  private getCollection<TSchema extends Document>() {
    if (!MongoDB.client) {
      throw new Error("Database is not connected.");
    }

    return MongoDB.client.db(DB_NAME).collection<TSchema>(this.collectionName);
  }

  public static connect(uri: string) {
    if (!uri) {
      throw new Error("Url is required.");
    }

    const client = new MongoClient(uri);

    return client
      .connect()
      .then((client) => {
        MongoDB.client = client;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  static disconnect() {
    if (!MongoDB.client) {
      return Promise.resolve();
    }

    return MongoDB.client.close();
  }

  private insertOne(data: OptionalUnlessRequiredId<DefaultProperties>) {
    preformatData(data);

    return this.getCollection()
      .insertOne(data)
      .then((result) => result.insertedId.toString());
  }

  // private insertMany(data: DefaultPropertiesWithoutId[]) {
  //   return this.getCollection().insertMany(data);
  // }

  private updateOne<T extends Document>(data: Filter<T>, newData: UpdateFilter<T>) {
    preformatData(data);

    return this.getCollection<T>().updateOne(data, newData);
  }

  private deleteOne<T extends Document>(data: Filter<T>) {
    preformatData(data);

    return this.getCollection<T>().deleteOne(data);
  }

  private deleteMany<T extends Document>(data: Filter<T>) {
    preformatData(data);

    return this.getCollection<T>().deleteMany(data);
  }

  private findOne<T extends Document>(data: Filter<T>) {
    preformatData(data);

    return this.getCollection<T>()
      .findOne(data)
      .then((result) => {
        result && formatResponse(result);

        return result;
      });
  }

  private findMany<T extends DefaultProperties>(params: Filter<T>) {
    preformatData(params);

    const collection = this.getCollection<T & DefaultProperties>().find(params);

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
        this.collection.skip(value);
        return this;
      }

      sort(params: SortAttribute<Partial<T>>) {
        this.collection.sort(params);
        return this;
      }

      exec() {
        return this.collection.toArray().then((result) =>
          result.map((document) => {
            formatResponse(document);
            return document;
          })
        );
      }
    }

    return new Aggregator();
  }

  static model<T extends z.AnyZodObject>(name: string, schema: T) {
    type Attributes = InferType<typeof schema>;
    type IModelWithId = WithId<Attributes & DefaultProperties>;
    type IModelWithoutId = WithoutId<Attributes & DefaultProperties>;
    const validator = schema.merge(defaultProperties);

    class Document implements IDocument<IModelWithoutId> {
      private static collectionRef: MongoDB = new MongoDB(`${name}s`);
      attributes: IModelWithoutId;

      constructor(params: Attributes) {
        const parsedParams = validator.parse(params) as IModelWithoutId;

        this.attributes = parsedParams;
      }

      save() {
        return Document.collectionRef.insertOne(this.attributes);
      }

      /**
       * @description Takes main attributes of document, default properties are set automatically
       * @param params Main attributes of document
       * @returns Promise which resolve on successful creation of document
       */
      static create(params: Attributes) {
        const newDocument = new Document(params);
        return this.collectionRef.insertOne(newDocument.attributes);
      }

      /**
       * @description Takes all the  attributes needed for document to be created
       * @param data - data for the document to be created
       * @returns Promise which resolve on successful creation of document
       *
       */
      static insertOne(data: IModelWithoutId) {
        return this.collectionRef.insertOne(data);
      }

      static updateOne(params: FilterOptions<IModelWithId>, replaceData: ReplaceAttributes<IModelWithId>) {
        return Document.collectionRef
          .updateOne(params, {
            $set: replaceData,
          })
          .then(({ acknowledged }) => acknowledged);
      }

      static findOne(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.findOne<IModelWithId>(params);
      }

      static findMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteOne(params).then(({ acknowledged }) => acknowledged);
      }

      static deleteMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteMany(params).then((r) => r.deletedCount);
      }
    }

    return Document;
  }
}
