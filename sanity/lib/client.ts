import { createClient, type SanityClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

/** Read-only client — uses CDN in production for fast cached reads */
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

/** Write client — NEVER expose to the browser; use only in API routes / scripts */
export const writeClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
