import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import session from 'express-session';
import { getApiUrl, getPort } from '#app/config';
import { shopifyAuth } from '#app/routers/auth/shopify/index.js';
import { router as googleAdsRouter } from '#app/routers/auth/googleAds';
import { router as tokenRouter } from '#app/routers/token';

declare module 'express-session' {
  interface SessionData {
    state: string;
    store: string;
  }
}

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(session({
  secret: 'your_secure_secret_key', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
}));

app.use(shopifyAuth.router());
app.use(googleAdsRouter);

app.use('/token', tokenRouter);

app.get('/health', (_, res) => {
  res.status(200).send('OK')
});

app.listen(getPort(), () => {
  console.log(`Server listening at ${getApiUrl()}`)
})
