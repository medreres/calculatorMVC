import { MongoClient } from "mongodb";
import { DB_NAME } from "./config";
import { Id, Attributes } from "./interfaces";

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

  static disconnect() {
    if (!MongoDB.client) {
      return;
    }

    MongoDB.client.close();
  }

  async insertOne(data: any) {
    return this.getCollection().insertOne(data);
  }

  async insertMany(data: object[]) {
    return this.getCollection().insertMany(data);
  }

  async deleteOne(data: object) {
    return this.getCollection().deleteOne(data);
  }

  async deleteMany(data: object) {
    return this.getCollection().deleteMany(data);
  }

  async findOne(data: Partial<Attributes>) {
    return await this.getCollection()
      .findOne(data)
      .then((res) => res);
  }

  private async findMany(params: Partial<Attributes>) {
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

      static async findMany(params: Partial<IModel>): Promise<IModel[]> {
        return Document.collectionRef.findMany(params) as unknown as IModel[];
      }

      static async deleteOne(params: Partial<IModel>) {
        return Document.collectionRef.deleteOne(params);
      }

      static async deleteMany(params: Partial<IModel>) {
        return Document.collectionRef.deleteMany(params);
      }
    }

    return Document;
  }
}
