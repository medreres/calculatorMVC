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

  insertOne(data: any) {
    return this.getCollection().insertOne(data);
  }

  insertMany(data: object[]) {
    return this.getCollection().insertMany(data);
  }

  deleteOne(data: object) {
    return this.getCollection().deleteOne(data);
  }

  deleteMany(data: object) {
    return this.getCollection().deleteMany(data);
  }

  findOne(data: Partial<Attributes>) {
    return this.getCollection().findOne(data);
  }

  private findMany(params: Partial<Attributes>) {
    return this.getCollection().find(params).toArray();
  }

  static model<T>(name: string) {
    type IModel = T & Id;

    class Document {
      static collectionRef: MongoDB = new MongoDB(`${name}s`);

      constructor(params: T) {
        Object.assign(this, params);
      }

      save() {
        return Document.collectionRef.insertOne(this);
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
