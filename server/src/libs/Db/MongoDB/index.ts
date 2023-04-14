import { Filter, MongoClient, OptionalUnlessRequiredId, UpdateFilter, Document } from "mongodb";
import { QUERY_LIMIT } from "../config";
// import { ReplaceAttributes, WithId, SortAttribute, WithoutId, DefaultProperties, FilterOptions } from "./interfaces";
import {
  DefaultProperties,
  FilterOptions,
  IAggregator,
  IDocument,
  IStaticDb,
  IStaticDocument,
  ReplaceAttributes,
  SortAttribute,
  staticImplements,
  WithId,
  WithoutId,
} from "../interfaces";
import { CREATED_AT, DB_NAME, UPDATED_AT } from "../config/attributes";

export * from "./interfaces";
export * from "../config";

// TODO? class collection?
@staticImplements<IStaticDb>()
export default class MongoDB {
  protected static client: MongoClient | null = null;
  protected collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  private getCollection<TSchema extends Document>() {
    return MongoDB.client!.db(DB_NAME).collection<TSchema>(this.collectionName);
  }

  public static connect(uri: string) {
    if (!uri) {
      throw new Error("Db url is required");
    }

    const client = new MongoClient(uri);

    return client
      .connect()
      .then((client) => {
        MongoDB.client = client;
        return client;
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
    return this.getCollection().insertOne(data);
  }

  // private insertMany(data: DefaultPropertiesWithoutId[]) {
  //   return this.getCollection().insertMany(data);
  // }

  private updateOne<T extends Document>(data: Filter<T>, newData: UpdateFilter<T>) {
    return this.getCollection<T>().updateOne(data, newData);
  }

  // TODO
  private deleteOne<T extends Document>(data: Filter<T>) {
    return this.getCollection<T>().deleteOne(data);
  }

  private deleteMany<T extends Document>(data: Filter<T>) {
    return this.getCollection<T>().deleteMany(data);
  }

  private findOne<T extends Document>(data: Filter<T>) {
    return this.getCollection<T>().findOne(data);
  }

  private findMany<T extends DefaultProperties>(params: Filter<T>) {
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

      toArray() {
        return this.collection.toArray();
      }
    }

    return new Aggregator();
  }

  static model<T extends Document>(name: string) {
    // interfaces for property access
    type IModelWithId = WithId<T & DefaultProperties>;
    type IModelWithoutId = WithoutId<T & DefaultProperties>;

    @staticImplements<IStaticDocument<IModelWithoutId>>()
    class Document implements IDocument<IModelWithoutId> {
      // save ref to the collection
      private static collectionRef: MongoDB = new MongoDB(`${name}s`);
      attributes: IModelWithoutId;

      constructor(params: T) {
        this.attributes = {
          ...params,
          [CREATED_AT]: new Date(),
          [UPDATED_AT]: new Date(),
        };
      }

      save() {
        return Document.collectionRef.insertOne(this.attributes);
      }

      /**
       * @description Takes main attributes of document, default properties are set automatically
       * @param params Main attributes of document
       * @returns Promise which resolve on successful creation of document
       */
      static create(params: T) {
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

      // ? if updatedAt and createdAt are not passed, they will be undefined
      // static insertMany(data: IModelWithoutId[]) {
      //   return Document.collectionRef.insertMany(data);
      // }

      // TODO more abstract filtering
      static updateOne(params: FilterOptions<IModelWithId>, replaceData: ReplaceAttributes<IModelWithId>) {
        return Document.collectionRef.updateOne(params, replaceData);
      }

      // TODO custom query b
      static findOne(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.findOne<IModelWithId>(params);
      }

      static findMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteOne(params);
      }

      static deleteMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
