// @ts-nocheck
/**
 * Sanity Studio component — rendered only on the client.
 * Loaded dynamically in src/pages/studio/[[...index]].js
 */
import { NextStudio } from 'next-sanity/studio/client-component'
import config from '../../sanity.config'

export default function SanityStudio() {
  return <NextStudio config={config} />
}
