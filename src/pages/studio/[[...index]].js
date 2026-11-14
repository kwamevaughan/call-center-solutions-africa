/**
 * Sanity Studio embedded in Next.js Pages Router at /studio
 * Uses dynamic import to avoid SSR issues with the studio.
 */

import dynamic from 'next/dynamic'
import Head from 'next/head'

// Dynamically import the studio to avoid SSR
const StudioComponent = dynamic(
  () => import('../../components/SanityStudio'),
  { ssr: false }
)

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>CCSA Studio</title>
        {/* Studio needs to control the full viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style global jsx>{`
        html, body, #__next { height: 100%; }
      `}</style>
      <div style={{ height: '100vh' }}>
        <StudioComponent />
      </div>
    </>
  )
}
