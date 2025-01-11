import { AbstractSessionStore } from '@versollabs/shopify-auth-express-middleware'
import { mongoSessionStore } from '#app/routers/auth/shopify/mongoSessionStore'

class SessionStoreAdapter implements AbstractSessionStore {
  async add(shopName: string, accessToken: string): Promise<void> {
    await mongoSessionStore.add(shopName, accessToken)
  }

  async get(shopName: string): Promise<string | null> {
    shopName
    return null
  }
}

const sessionStoreAdapter = new SessionStoreAdapter()

export { sessionStoreAdapter }
