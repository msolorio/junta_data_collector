const getPort = function (): number {
  return Number(process.env.PORT) || 3001;
}

const getApiUrl = function (): string {
  const host = process.env.API_HOST || 'localhost'
  return `http://${host}:${getPort()}`
}
export const AUTHORIZOR_ENDPOINT = process.env.AUTHORIZOR_ENDPOINT

export const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID
export const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET

export const GOOGLE_ADS_CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID
export const GOOGLE_ADS_CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET

export const MONGODB_URI = process.env.MONGODB_URI

export { getApiUrl, getPort }
