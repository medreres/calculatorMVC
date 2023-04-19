import { z } from "zod";
import { Filter, MongoClient, OptionalUnlessRequiredId, UpdateFilter } from "mongodb";
import { QUERY_LIMIT } from "../config";
import {
  AttributeKeys,
  DefaultProperties,
  FilterOptions,
  IAggregator,
  IDocument,
  IStaticDocument,
  ReplaceAttributes,
  SortAttribute,
  staticImplements,
  WithId,
  WithoutId,
  Document,
  IStaticDb,
} from "../interfaces";
import { DB_NAME } from "../config/attributes";
import { renameProperty } from "../utils";

export * from "../config";

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
    // TODO or
    // TODO { expression: ['1+2','3']}

    /**
     * or: [
     * {
     * expression:}]
     */

    // console.log(data)c

    return this.getCollection<T>()
      .findOne(data)
      .then((result) => {
        if (result) {
          renameProperty(result, "_id", "id");
        }

        return result;
      });
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

      exec() {
        return this.collection.toArray().then((result) => result.map((document) => document));
      }
    }

    return new Aggregator();
  }

  static model<T extends z.AnyZodObject>(name: string, schema: T) {
    type Attributes = z.infer<typeof schema>;
    type IModelWithId = WithId<Attributes & DefaultProperties>;
    type IModelWithoutId = WithoutId<Attributes & DefaultProperties>;

    @staticImplements<IStaticDocument<IModelWithoutId>>()
    class Document implements IDocument<IModelWithoutId> {
      private static collectionRef: MongoDB = new MongoDB(`${name}s`);
      attributes: IModelWithoutId;

      // TODO zod extend
      constructor(params: Attributes) {
        // TODO avoid type casting
        const parsedParams = schema.parse(params) as IModelWithoutId;

        this.attributes = parsedParams;
      }

      save() {
        return Document.collectionRef.insertOne(this.attributes).then((result) => result.insertedId.toString());
      }

      /**
       * @description Takes main attributes of document, default properties are set automatically
       * @param params Main attributes of document
       * @returns Promise which resolve on successful creation of document
       */
      static create(params: Attributes) {
        const newDocument = new Document(params);
        return this.collectionRef.insertOne(newDocument.attributes).then((result) => {
          console.log(result);
          return result.insertedId.toString();
        });
      }

      /**
       * @description Takes all the  attributes needed for document to be created
       * @param data - data for the document to be created
       * @returns Promise which resolve on successful creation of document
       *
       */
      static insertOne(data: IModelWithoutId) {
        return this.collectionRef.insertOne(data).then((result) => result.insertedId.toString());
      }

      // TODO more abstract filtering
      static updateOne(params: FilterOptions<IModelWithId>, replaceData: ReplaceAttributes<IModelWithId>) {
        if ("id" in params) {
          params = Object.assign(params, {
            _id: params.id,
            id: undefined,
          });
        }

        return Document.collectionRef
          .updateOne(params, {
            $set: replaceData,
          })
          .then(({ acknowledged }) => acknowledged);
      }

      static findOne(params: FilterOptions<IModelWithId>) {
        if (AttributeKeys.OR in params) {
          renameProperty(params, AttributeKeys.OR, "$or");
        }

        return Document.collectionRef.findOne<IModelWithId>(params).then((r) => {
          if (r) {
            renameProperty(r, "_id", AttributeKeys.ID);
            r.id = r.id.toString();
          }

          return r as IModelWithId | null;
        });
      }

      static findMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.findMany<IModelWithId>(params);
      }

      static deleteOne(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteOne(params).then(({ acknowledged }) => acknowledged);
      }

      static deleteMany(params: FilterOptions<IModelWithId>) {
        return Document.collectionRef.deleteMany(params).then((r) => r.deletedCount);
      }
    }

    return Document;
  }
}
