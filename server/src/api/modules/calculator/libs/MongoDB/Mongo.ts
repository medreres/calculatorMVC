import { MongoClient } from "mongodb";
import { DB_NAME } from "./config";
import { checkConnection } from "./services";
import { Id, InitialParams } from "./interfaces";

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
    type IModel = T & Id;
    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);

      constructor(params: T) {
        Object.assign(this, params);
      }

      async save() {
        return Document.collectionRef.insertOne(this);
      }

      static async findOne(params: Partial<IModel>): Promise<IModel | null> {
        return Document.collectionRef.findOne(params) as unknown as IModel | null;
      }

      static async findMany(params: Partial<IModel>): Promise<T[]> {
        return Document.collectionRef.findMany(params) as unknown as T[];
      }

      static async deleteOne(params: Partial<IModel> & Partial<Id>) {
        return Document.collectionRef.deleteOne(params);
      }

      static async deleteMany(params: Partial<IModel>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
