import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config';
import { shopifyAuth } from '#app/routers/auth/shopify/index.js';
import { router as shopifyTokenRouter } from '#app/routers/token/shopify.js';

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

// /shopify/auth
// /shopify/auth/callback
app.use('/auth/shopify', shopifyAuth.router());

app.use('/token/shopify', shopifyTokenRouter);

app.get('/health', (_, res) => {
  res.status(200).send('OK')
});

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
