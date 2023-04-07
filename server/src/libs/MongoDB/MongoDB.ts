import { MongoClient } from "mongodb";
import { CREATED_AT, DB_NAME, QUERY_LIMIT, UPDATED_AT } from "./config";
import {
  AggregationAttributes,
  DefaultProperties,
  DefaultQueryProperties,
  LIMIT_ATTRIBUTE,
  QueryAttributes,
  ReplaceAttributes,
  SKIP_ATTRIBUTE,
  SORT_ATTRIBUTE,
} from "./interfaces";

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

  private insertOne(data: Partial<DefaultProperties>) {
    return this.getCollection().insertOne(data);
  }

  private updateOne(data: DefaultQueryProperties, newData: ReplaceAttributes<DefaultProperties>) {
    return this.getCollection().updateOne(data, newData);
  }

  private insertMany(data: Partial<DefaultProperties>[]) {
    return this.getCollection().insertMany(data);
  }

  private deleteOne(data: Partial<DefaultProperties>) {
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
      Object.keys(aggregationAttributes).forEach((key) => {
        if (key === LIMIT_ATTRIBUTE) {
          result = result.limit(aggregationAttributes[key]!);
        } else if (key === SKIP_ATTRIBUTE) {
          result = result.skip(aggregationAttributes[key]!);
        } else if (key === SORT_ATTRIBUTE) {
          result = result.sort(aggregationAttributes[key]!);
        }
      });
    } else {
      result.limit(QUERY_LIMIT);
    }

    return result.toArray();
  }

  // TODO how to avoid type assertions
  static model<T>(name: string) {
    // interface for property access
    type IModel = T & DefaultProperties;
    // interface for querying model
    // type QueryParams = Partial<T & DefaultProperties & Or<T>>;

    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);
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

      static create(params: T): Document {
        const newDocument = new Document(params);
        newDocument.save();
        return newDocument;
      }

      static insertOne(data: IModel) {
        return Document.collectionRef.insertOne(data);
      }

      static insertMany(data: IModel[]) {
        return Document.collectionRef.insertMany(data);
      }

      static updateOne(data: QueryAttributes<IModel>, replaceData: ReplaceAttributes<IModel>) {
        return Document.collectionRef.updateOne(data, replaceData);
      }

      static findOne(params: QueryAttributes<IModel>) {
        return Document.collectionRef.findOne(params) as Promise<IModel | null>;
      }

      static findMany(params?: QueryAttributes<IModel>, aggregationAttributes?: AggregationAttributes<IModel>) {
        return Document.collectionRef.findMany(params, aggregationAttributes) as Promise<IModel[]>;
      }

      static deleteOne(params: QueryAttributes<IModel>) {
        return Document.collectionRef.deleteOne(params);
      }

      static deleteMany(params: QueryAttributes<IModel>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
