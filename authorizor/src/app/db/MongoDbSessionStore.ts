import 'dotenv/config';
import { MongoClient, Db } from 'mongodb';
import { MONGODB_URI } from '#app/config';
import { AbstractSessionStore, MongoDbSessionStoreOptions, Shop, CollectionName } from '#app/db/types';

export const MongoDbSessionStore = function MongoDbSessionStore(options: MongoDbSessionStoreOptions) {
  return new _MongoDbSessionStore(options);
}

class _MongoDbSessionStore implements AbstractSessionStore {
  private _mongodbClient: MongoClient
  private _db: Db

  constructor(options: MongoDbSessionStoreOptions) {
    this._mongodbClient = new MongoClient(options.url);
    this._db = this._mongodbClient.db(options.dbName);
  }

  public async add(shop: Shop, collectionName: CollectionName) {
    await this._mongodbClient.connect()
    const collection = this._db.collection(collectionName);
    await collection.updateOne(
      { shopName: shop.shopName },
      { $set: shop },
      { upsert: true },
    )
    await this._mongodbClient.close()
  }

  public async get(shopName: string, collectionName: CollectionName): Promise<Shop | null> {
    await this._mongodbClient.connect()
    const collection = this._db.collection(collectionName);
    const result = await collection.findOne({ shopName })
    await this._mongodbClient.close()
    return result as unknown as Shop | null;
  }
}

const mongoDbSessionStore = MongoDbSessionStore({
  url: MONGODB_URI,
  dbName: 'access_tokens',
});

export { mongoDbSessionStore };
