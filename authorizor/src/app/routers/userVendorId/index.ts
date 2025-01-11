import { Router } from 'express';
import { mongoSessionStore } from '#app/routers/auth/shopify/mongoSessionStore';

const router = Router();

router.post('/', async (req, res) => {
  await mongoSessionStore.addUserVendorId({
    vendor: req.body.vendor,
    userVendorId: req.body.user_vendor_id,
    juntaId: req.body.junta_id
  })

  res.status(201).send('Created')
})

export { router };
