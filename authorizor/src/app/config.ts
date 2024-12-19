const getPort = function (): number {
  return Number(process.env.PORT) || 3001;
}

const getApiUrl = function (): string {
  const host = String(process.env.API_HOST) || 'localhost'
  return `http://${host}:${getPort()}`
}
// authorizor
export const AUTHORIZOR_ENDPOINT = String(process.env.AUTHORIZOR_ENDPOINT)

// shopify
export const SHOPIFY_CLIENT_ID = String(process.env.SHOPIFY_CLIENT_ID)
export const SHOPIFY_CLIENT_SECRET = String(process.env.SHOPIFY_CLIENT_SECRET)

// google ads
export const GOOGLE_ADS_CLIENT_ID = String(process.env.GOOGLE_ADS_CLIENT_ID)
export const GOOGLE_ADS_CLIENT_SECRET = String(process.env.GOOGLE_ADS_CLIENT_SECRET)

// mongodb
export const MONGODB_URI = String(process.env.MONGODB_URI)

export { getApiUrl, getPort }
