import { MongoClient } from "mongodb";
import { DB_NAME } from "./config";
import { Attributes, Or } from "./interfaces";

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

  private insertOne(data: any) {
    return this.getCollection().insertOne(data);
  }

  private insertMany(data: any[]) {
    return this.getCollection().insertMany(data);
  }

  private deleteOne(data: object) {
    return this.getCollection().deleteOne(data);
  }

  private deleteMany(data: object) {
    return this.getCollection().deleteMany(data);
  }

  private findOne(data: Partial<Attributes>) {
    return this.getCollection().findOne(data);
  }

  // TODO better
  // TODO ommit somehow all the query properties like $limit
  private findMany(params: Partial<Attributes>) {
    // console.log(keyof QueryParams);

    let result = this.getCollection().find(params);

    // if (params.$limit) {
    //   result = result.limit(params.$limit);
    // }
    return result.toArray();
  }

  // TODO extends
  static model<T>(name: string) {
    type IModel = T & Attributes & Or<T>;

    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);

      constructor(params: T) {
        Object.assign(this, params);
      }

      save() {
        return Document.collectionRef.insertOne(this);
      }

      static insertOne(data: T) {
        return Document.collectionRef.insertOne(data) as Promise<T>;
      }

      static insertMany(data: T[]) {
        return Document.collectionRef.insertMany(data as T[]);
      }

      static findOne(params: Partial<IModel>) {
        return Document.collectionRef.findOne(params) as Promise<IModel | null>;
      }

      static findMany(params: Partial<IModel>) {
        return Document.collectionRef.findMany(params) as Promise<IModel[]>;
      }

      static deleteOne(params: Partial<IModel>) {
        return Document.collectionRef.deleteOne(params);
      }

      static deleteMany(params: Partial<IModel>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
