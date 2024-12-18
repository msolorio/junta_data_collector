import { Router } from 'express';
import { shopifyAuth } from '#app/routers/auth/shopify/index.js';

const router = Router();

// /token/shopify/:store
router.get('/:store', async (req, res) => {
  const storeName = req.params.store;
  const accessToken = await shopifyAuth.getAccessToken(storeName);
  return res.status(200).send({ accessToken });
});

export { router };
