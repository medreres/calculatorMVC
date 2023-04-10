import { MongoClient } from "mongodb";
import { DB_NAME, QUERY_LIMIT, CREATED_AT, UPDATED_AT, ID } from "./config";
import {
  DefaultProperties,
  ReplaceAttributes,
  AggregationAttributes,
  LIMIT_ATTRIBUTE,
  SKIP_ATTRIBUTE,
  SORT_ATTRIBUTE,
  QueryAttributes,
  DefaultPropertiesWithoutId,
} from "./interfaces";

export * from "./interfaces";
export * from "./config";

export default class MongoDB {
  protected static client: MongoClient | null = null;
  protected collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  private getCollection() {
    return MongoDB.client!.db(DB_NAME).collection(this.collectionName);
  }

  static connect(uri: string) {
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
      return;
    }

    MongoDB.client.close();
  }

  private insertOne(data: Partial<DefaultPropertiesWithoutId>) {
    return this.getCollection().insertOne(data);
  }

  private updateOne(data: Partial<DefaultProperties>, newData: ReplaceAttributes<DefaultPropertiesWithoutId>) {
    return this.getCollection().updateOne(data, newData);
  }

  private insertMany(data: Partial<DefaultPropertiesWithoutId>[]) {
    return this.getCollection().insertMany(data);
  }

  private deleteOne(data: Partial<DefaultPropertiesWithoutId>) {
    return this.getCollection().deleteOne(data);
  }

  private deleteMany(data: Partial<DefaultProperties>) {
    return this.getCollection().deleteMany(data);
  }

  private findOne(data: Partial<DefaultProperties>) {
    return this.getCollection().findOne(data);
  }

  private findMany(
    params: Partial<DefaultProperties> = {},
    aggregationAttributes?: AggregationAttributes<DefaultProperties>
  ) {
    let result = this.getCollection().find(params);

    if (aggregationAttributes) {
      if (LIMIT_ATTRIBUTE in aggregationAttributes) {
        result = result.limit(aggregationAttributes[LIMIT_ATTRIBUTE]!);
      }

      if (SKIP_ATTRIBUTE in aggregationAttributes) {
        result = result.skip(aggregationAttributes[SKIP_ATTRIBUTE]!);
      }

      if (SORT_ATTRIBUTE in aggregationAttributes) {
        result = result.sort(aggregationAttributes[SORT_ATTRIBUTE]!);
      }
    }

    // if query limit has not been set, set to default
    if (!aggregationAttributes || !(LIMIT_ATTRIBUTE in aggregationAttributes)) {
      result.limit(QUERY_LIMIT);
    }

    return result.toArray();
  }

  static model<T>(name: string) {
    // interfaces for property access
    type IModelWithId = DefaultProperties & T;
    type IModelWithoutId = T & Omit<DefaultProperties, typeof ID>;

    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);
      // default fields createdAt and updatedAt
      [CREATED_AT]: Date;
      [UPDATED_AT]: Date;

      constructor(params: T) {
        this[CREATED_AT] = new Date();
        this[UPDATED_AT] = new Date();

        Object.assign(this, params);
      }

      save() {
        return Document.collectionRef.insertOne(this);
      }

      static create(params: IModelWithoutId) {
        const newDocument = new Document(params);
        newDocument.save();
        return newDocument;
      }

      static insertOne(data: IModelWithoutId) {
        return Document.collectionRef.insertOne(data);
      }

      static insertMany(data: IModelWithoutId[]) {
        return Document.collectionRef.insertMany(data);
      }

      static updateOne(data: QueryAttributes<IModelWithId>, replaceData: ReplaceAttributes<IModelWithoutId>) {
        return Document.collectionRef.updateOne(data, replaceData);
      }

      static findOne(params: QueryAttributes<IModelWithId>) {
        return Document.collectionRef.findOne(params);
      }

      static findMany(
        params?: QueryAttributes<IModelWithId>,
        aggregationAttributes?: AggregationAttributes<IModelWithId>
      ) {
        return Document.collectionRef.findMany(params, aggregationAttributes);
      }

      static deleteOne(params: QueryAttributes<IModelWithId>) {
        return Document.collectionRef.deleteOne(params);
      }

      static deleteMany(params: QueryAttributes<IModelWithId>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
