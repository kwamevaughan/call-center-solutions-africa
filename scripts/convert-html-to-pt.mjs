/**
 * Second-pass migration: rawHtml → Portable Text body
 *
 * Reads every Sanity post that has rawHtml but no body,
 * converts the HTML using @sanity/block-tools + jsdom,
 * and patches the body field.
 *
 * Run after migrate-to-sanity.mjs:
 *   node scripts/convert-html-to-pt.mjs
 */

import { createClient as createSanity } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const sanitySchemaModule = require('@sanity/schema')
const Schema = sanitySchemaModule.Schema ?? sanitySchemaModule.default?.Schema ?? sanitySchemaModule.default
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Load env ─────────────────────────────────────────────────────────────────

function loadEnv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    console.warn('⚠️  Could not read .env file')
  }
}

loadEnv(join(__dirname, '..', '.env'))

// ─── Sanity client ────────────────────────────────────────────────────────────

const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// ─── Block schema (matches blockContent.ts) ───────────────────────────────────

const blockContentSchema = Schema.compile({
  name: 'ccsa',
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Underline', value: 'underline' },
                  { title: 'Code', value: 'code' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'URL',
                    fields: [
                      { name: 'href', type: 'url', title: 'URL' },
                      { name: 'blank', type: 'boolean', title: 'Open in new tab' },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
})

const blockContentType = blockContentSchema
  .get('post')
  .fields.find((f) => f.name === 'body').type

// ─── Convert one post ─────────────────────────────────────────────────────────

function convertHtml(html) {
  if (!html || !html.trim()) return []

  // Wrap in a div to ensure valid HTML
  const wrappedHtml = `<div>${html}</div>`

  return htmlToBlocks(wrappedHtml, blockContentType, {
    parseHtml: (htmlStr) => new JSDOM(htmlStr).window.document,
    rules: [],
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Converting rawHtml → Portable Text body...')

  // Find all posts with rawHtml
  const posts = await sanity.fetch(
    `*[_type == "post" && defined(rawHtml) && rawHtml != ""] {
      _id, title, rawHtml, body
    }`
  )

  console.log(`  Found ${posts.length} post(s) with rawHtml`)

  let converted = 0
  let skipped = 0
  let errors = 0

  for (const post of posts) {
    // Skip if already has a PT body with content
    if (post.body && Array.isArray(post.body) && post.body.length > 0) {
      console.log(`  ⏭  Skipping "${post.title}" (already has body)`)
      skipped++
      continue
    }

    try {
      const blocks = convertHtml(post.rawHtml)

      if (!blocks || blocks.length === 0) {
        console.warn(`  ⚠️  No blocks generated for "${post.title}" — keeping rawHtml`)
        skipped++
        continue
      }

      await sanity.patch(post._id).set({ body: blocks }).commit()
      console.log(`  ✅ Converted "${post.title}" (${blocks.length} blocks)`)
      converted++
    } catch (err) {
      console.error(`  ❌ Failed "${post.title}": ${err.message}`)
      errors++
    }
  }

  console.log(`\n📊 Summary: ${converted} converted, ${skipped} skipped, ${errors} errors`)

  if (errors === 0 && converted > 0) {
    console.log('\n✨ All posts converted to Portable Text!')
    console.log('   You can now safely clear rawHtml fields from Sanity Studio.')
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
