import { ShopifyAuth, MongoDbSessionStore } from '@versollabs/shopify-auth-express-middleware'
import { CLIENT_ID, CLIENT_SECRET, SHOPIFY_AUTH_ENDPOINT } from '#app/config';
import { scopes } from './scopes';

export const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: String(CLIENT_ID),
    apiSecretKey: String(CLIENT_SECRET),
    hostName: String(SHOPIFY_AUTH_ENDPOINT),
    scopes: scopes,
  },
  authPaths: {
    begin: '/auth',
    callback: '/auth/callback',
  },
  sessionStore: MongoDbSessionStore({
    url: String(process.env.MONGODB_URI),
    dbName: 'access_tokens',
    collectionName: 'shopify',
  })
});

