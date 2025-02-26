import { MongoClient, Db, Collection } from 'mongodb';
import { MONGODB_URI } from '#app/config'

type User = {
  junta_id: string
  shopify?: {
    user_vendor_id?: string
    access_token?: string
  }
  google_ads?: {
    user_vendor_id?: string
    refresh_token?: string
  }
}

class _MongoSessionStore {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor() {
    this._mongodbClient = new MongoClient(MONGODB_URI);
    this._db = this._mongodbClient.db('auth');
    this._shopsModel = this._db.collection('shops_access_tokens');
  }

  public async add(shopName: string, accessToken: string): Promise<void> {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { 'shopify.user_vendor_id': shopName },
      { $set: { 'shopify.access_token': accessToken } },
      { upsert: false },
    )
    await this._mongodbClient.close()
  }

  public async addUserVendorId({
    vendor,
    userVendorId,
    juntaId
  }: {
    vendor: string
    userVendorId: string
    juntaId: string
  }): Promise<void> {
    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { 'junta_id': juntaId },
      { $set: { [`${vendor}.user_vendor_id`]: userVendorId } },
      { upsert: false }
    )
  }

  public async getUserAuthByJuntaId(juntaId: string): Promise<User | null> {
    await this._mongodbClient.connect()
    const result = await this._shopsModel.findOne({ 'junta_id': juntaId })
    await this._mongodbClient.close()

    return (result || null) as unknown as User | null
  }
}

const mongoSessionStore = new _MongoSessionStore()

export { mongoSessionStore }
