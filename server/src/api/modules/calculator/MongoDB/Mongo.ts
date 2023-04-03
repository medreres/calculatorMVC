import { MongoClient } from "mongodb";
import { DB_NAME } from "./config";
import { checkConnection } from "./services";
import { InitialParams } from "./interfaces";

export interface ISchema {
  [key: string]: Types;
}

export enum Types {
  String = "string",
  Number = "number",
}

//TODO close connection method
export default class MongoDB {
  protected static client: MongoClient | null = null;
  protected collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  private getCollection() {
    return MongoDB.client!.db(DB_NAME).collection(this.collectionName);
  }

  static async connect(uri: string) {
    const client = new MongoClient(uri);

    await client
      .connect()
      .then((client) => {
        MongoDB.client = client;
        return client;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // TODO decorators could be used
  async insertOne(data: any) {
    checkConnection.call(this);

    return this.getCollection().insertOne(data);
  }

  // TODO decorators could be used
  async insertMany(data: object[]) {
    checkConnection.call(this);

    return this.getCollection().insertMany(data);
  }

  async deleteOne(data: object) {
    return this.getCollection().deleteOne(data);
  }

  async deleteMany(data: object) {
    return this.getCollection().deleteMany(data);
  }

  // TODO decorators could be used

  async findOne(data: Partial<InitialParams>) {
    checkConnection.call(this);

    return await this.getCollection()
      .findOne(data)
      .then((res) => res);
  }

  // TODO decorators could be used
  private async findMany(params: Partial<InitialParams>) {
    checkConnection.call(this);

    return this.getCollection().find(params).toArray();
  }

  static model<T>(name: string) {
    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);

      constructor(params: T) {
        Object.assign(this, params);
      }

      async save() {
        return Document.collectionRef.insertOne(this);
      }

      static async findOne(params: Partial<T> & Partial<InitialParams>) {
        return Document.collectionRef.findOne(params);
      }

      static async findMany(params: Partial<T> & Partial<InitialParams>) {
        return Document.collectionRef.findMany(params);
      }

      static async deleteOne(params: Partial<T> & Partial<InitialParams>) {
        return Document.collectionRef.deleteOne(params);
      }

      static async deleteMany(params: Partial<T> & Partial<InitialParams>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
