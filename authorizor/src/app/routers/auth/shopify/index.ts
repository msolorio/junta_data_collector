import { ShopifyAuth, MongoDbSessionStore } from '@versollabs/shopify-auth-express-middleware'
import { SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, AUTHORIZOR_ENDPOINT, MONGODB_URI } from '#app/config';
import { scopes } from './scopes';

export const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: SHOPIFY_CLIENT_ID,
    apiSecretKey: SHOPIFY_CLIENT_SECRET,
    hostName: AUTHORIZOR_ENDPOINT,
    scopes: scopes,
  },
  authPaths: {
    begin: '/auth/shopify',
    callback: '/auth/shopify/callback',
  },
  sessionStore: MongoDbSessionStore({
    url: MONGODB_URI,
    dbName: 'access_tokens',
    collectionName: 'shopify',
  })
});
