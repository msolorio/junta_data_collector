import { AbstractSessionStore } from '@versollabs/shopify-auth-express-middleware'
import { MongoClient, Db, Collection } from 'mongodb';
import { MONGODB_URI } from '#app/config'

export const MongoSessionStore = () => {
  return new _MongoSessionStore()
}

class _MongoSessionStore implements AbstractSessionStore {
  private _mongodbClient: MongoClient
  private _db: Db
  private _shopsModel: Collection

  constructor() {
    this._mongodbClient = new MongoClient(MONGODB_URI);
    this._db = this._mongodbClient.db('auth');
    this._shopsModel = this._db.collection('shops_access_tokens');
  }

  public async add(shopName: string, accessToken: string): Promise<void> {
    console.log('shopName:', shopName)
    console.log('accessToken:', accessToken)

    await this._mongodbClient.connect()
    await this._shopsModel.updateOne(
      { 'shopify.user_vendor_id': shopName },
      { $set: { 'shopify.access_token': accessToken } },
      { upsert: false },
    )
    await this._mongodbClient.close()
  }

  public async get(shopName: string): Promise<string | null> {
    shopName
    return null
  }

  public async getByUserId(juntaId: string): Promise<string | null> {
    await this._mongodbClient.connect()
    const result = await this._shopsModel.findOne({ 'junta_id': juntaId })
    await this._mongodbClient.close()

    return result && result.shopify && result.shopify.access_token || null as unknown as string | null
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
}
