import { ShopifyAuth } from '@versollabs/shopify-auth-express-middleware'
import { SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, AUTHORIZOR_ENDPOINT } from '#app/config';
import { scopes } from './scopes';
import { MongoSessionStore } from './mongoSessionStore';


export const shopifyAuth = ShopifyAuth({
  api: {
    apiKey: SHOPIFY_CLIENT_ID,
    apiSecretKey: SHOPIFY_CLIENT_SECRET,
    hostName: AUTHORIZOR_ENDPOINT,
    scopes: scopes,
  },
  authPaths: {
    begin: '/auth/shopify/begin',
    callback: '/auth/shopify/callback',
  },
  sessionStore: MongoSessionStore(),
});
