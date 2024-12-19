import { ShopifyAuth, MongoDbSessionStore } from '@versollabs/shopify-auth-express-middleware'
import { SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, AUTHORIZOR_ENDPOINT } from '#app/config';
import { scopes } from './scopes';

export const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: String(SHOPIFY_CLIENT_ID),
    apiSecretKey: String(SHOPIFY_CLIENT_SECRET),
    hostName: String(AUTHORIZOR_ENDPOINT),
    scopes: scopes,
  },
  authPaths: {
    begin: '/auth/shopify',
    callback: '/auth/shopify/callback',
  },
  sessionStore: MongoDbSessionStore({
    url: String(process.env.MONGODB_URI),
    dbName: 'access_tokens',
    collectionName: 'shopify',
  })
});
