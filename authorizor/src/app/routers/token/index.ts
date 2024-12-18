import { Router } from 'express';
import { router as shopifyTokenRouter } from './shopify';

const router = Router();

router.use('/shopify', shopifyTokenRouter);

export { router };
