import { Router } from 'express';
import { mongoDbSessionStore } from '#app/db/MongoDbSessionStore';

const router = Router();

// /token/google-ads/:store
router.get('/:store', async (req, _) => {
  const storeName = req.params.store;
  const shop = await mongoDbSessionStore.get(storeName, 'google-ads');
  shop
  // TODO: exchange refresh token for access token

  // TODO: return access token
  // return res.status(200).send({ accessToken });
});

export { router };
