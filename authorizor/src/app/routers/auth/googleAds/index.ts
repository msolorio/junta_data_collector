import { Router, Request, Response } from 'express';
import crypto from 'node:crypto';
import { google } from 'googleapis';
import path from 'node:path';
import url from 'node:url';
import { GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, AUTHORIZOR_ENDPOINT, MONGODB_URI } from '#app/config';

import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient(MONGODB_URI);
const db = mongoClient.db('access_tokens');
const googleAdsTokenModel = db.collection('google_ads');


const scopes = [
  'https://www.googleapis.com/auth/adwords'
];

console.log('AUTHORIZOR_ENDPOINT:', AUTHORIZOR_ENDPOINT);
console.log('GOOGLE_ADS_CLIENT_ID:', GOOGLE_ADS_CLIENT_ID);
console.log('GOOGLE_ADS_CLIENT_SECRET:', GOOGLE_ADS_CLIENT_SECRET);
console.log(`https://${path.join(AUTHORIZOR_ENDPOINT, '/auth/google-ads/oauth2callback')}`);

const oauth2Client = new google.auth.OAuth2(
  // YOUR_CLIENT_ID,
  GOOGLE_ADS_CLIENT_ID,
  // YOUR_CLIENT_SECRET,
  GOOGLE_ADS_CLIENT_SECRET,
  // YOUR_REDIRECT_URL,
  'http://localhost:3001/auth/google-ads/oauth2callback'
  // `https://${path.join(AUTHORIZOR_ENDPOINT, '/auth/google-ads/oauth2callback')}`
);

const router = Router();

router.get('/auth/google-ads/begin/:store', async (req: Request, res: Response) => {
  try {
    const state = crypto.randomBytes(32).toString('hex');
    req.session.state = state;
    req.session.store = req.params.store;

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline', // gets refresh token
      scope: scopes,
      include_granted_scopes: true,
      state: state,
      prompt: 'consent',
    });

    res.redirect(authorizationUrl);
  } catch (error) {
    console.log('Error occured beginning google ads oauth flow.')
    console.error(error);
    res.status(500).send('An error occurred');

  }
})

router.get('/auth/google-ads/oauth2callback', async (req, res) => {
  try {
    const q = url.parse(req.url, true).query as { code: string, state: string, error: string };

    if (q.error) {
      console.log('Error:' + q.error);
    } else if (q.state !== req.session.state) { //check state value
      console.log('State mismatch. Possible CSRF attack');
      res.end('State mismatch. Possible CSRF attack');
    } else {
      const { tokens } = await oauth2Client.getToken(q.code);

      await mongoClient.connect();
      await googleAdsTokenModel.updateOne(
        { shopName: req.session.store },
        {
          $set: {
            shopName: req.session.store,
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
          }
        },
        { upsert: true },
      )
      await mongoClient.close();

      res.send('Authentication successful! Please return to the console.');
    }
  } catch (error) {
    console.log('Error occured during google ads oauth callback.')
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

export { router };
