import { MongoClient } from "mongodb";
import { DB_NAME } from "./config";
import { Attributes, Id, Or } from "./interfaces";

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

  // TODO $set method
  private updateOne(data: any, newData: any) {
    return this.getCollection().updateOne(data, newData);
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
  private findMany(params: Partial<Attributes> = {}) {
    let result = this.getCollection().find(params);

    return result;
  }

  // TODO extends

  // TODO Line 86: Use ‘extends’ to avoid ‘as’
  //Do you really need type assertions here?
  //Please add more precise types instead of ‘object’
  //It would be better to name files files and classes inside the same
  // TODO make craetead at and updatedAt as default params
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

      // TODo separate query params from standart parameters
      static updateOne(data: Partial<T & Id>, replaceData: any) {
        return Document.collectionRef.updateOne(data, replaceData);
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
