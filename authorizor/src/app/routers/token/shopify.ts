import { Router } from 'express';
import { mongoSessionStore } from '#app/routers/auth/shopify/mongoSessionStore.js';

const router = Router();

// /token/shopify/:junta_id
router.get('/:junta_id', async (req, res) => {
  const juntaId = req.params.junta_id;
  const user = await mongoSessionStore.getUserAuthByJuntaId(juntaId);
  const accessToken = user && user.shopify && user.shopify.access_token;

  return res.status(200).send({ accessToken });
})

export { router };
