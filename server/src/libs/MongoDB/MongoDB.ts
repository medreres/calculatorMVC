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
  private findMany(params : Partial<Attributes> = {}) {
    let result = this.getCollection().find(params);

    return result.toArray();
  }

  // TODO extends

  // TODO Line 86: Use ‘extends’ to avoid ‘as’
  //Do you really need type assertions here?
  //Please add more precise types instead of ‘object’
  //It would be better to name files files and classes inside the same
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
        return Document.collectionRef.insertOne(data);
      }

      static insertMany(data: T[]) {
        return Document.collectionRef.insertMany(data);
      }

      static findOne(params: Partial<IModel>) {
        return Document.collectionRef.findOne(params) as Promise<IModel | null>;
      }

      static findMany(params?: Partial<IModel>) {
        return Document.collectionRef.findMany(params);
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
