import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { getApiUrl, getPort } from '#app/config';
import { shopifyAuth } from '#app/routers/auth/shopify/index.js';
import { router as tokenRouter } from '#app/routers/token';

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(shopifyAuth.router());

app.use('/token', tokenRouter);

app.get('/health', (_, res) => {
  res.status(200).send('OK')
});

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
