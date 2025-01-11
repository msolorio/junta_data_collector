import { Router } from 'express';
import { MongoSessionStore } from '#app/routers/auth/shopify/mongoSessionStore';


const router = Router();

router.post('/', async (req, res) => {
  console.log('req.body:', req.body)

  await MongoSessionStore().addUserVendorId({
    vendor: req.body.vendor,
    userVendorId: req.body.user_vendor_id,
    juntaId: req.body.junta_id
  })

  res.status(200).send('user vendor id post');
})

export { router };
