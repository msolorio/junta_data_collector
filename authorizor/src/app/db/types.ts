export type Shop = {
  shopName: string;
  accessToken: string;
  refreshToken?: string;
}

export type CollectionName = 'shopify' | 'google-ads';

export interface AbstractSessionStore {
  add(_shop: Shop, _vendor: CollectionName): Promise<void>
  get(_shopName: string, _vendor: CollectionName): Promise<Shop | null>
}

export type MongoDbSessionStoreOptions = {
  url: string;
  dbName: string;
} | Record<string, never>;
