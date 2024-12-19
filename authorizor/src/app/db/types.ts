export type Shop = {
  shopName: string;
  accessToken: string;
  refreshToken?: string;
}

export type CollectionName = 'shopify' | 'google-ads';

export interface AbstractSessionStore {
  add(shop: Shop, vendor: CollectionName): Promise<void>
  get(shopName: string, vendor: CollectionName): Promise<Shop | null>
}

export type MongoDbSessionStoreOptions = {
  url: string;
  dbName: string;
} | Record<string, never>;
