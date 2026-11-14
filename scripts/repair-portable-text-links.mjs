/**
 * Restore Portable Text link annotations that were lost during HTML conversion.
 *
 * The original migration preserved source HTML in `rawHtml`. Some converted
 * spans contain `marks: [null]` and no corresponding `markDefs` entry. This
 * script matches those spans to their original anchors and restores only the
 * missing link annotations, leaving the rest of each article unchanged.
 *
 * Dry run: node scripts/repair-portable-text-links.mjs
 * Apply:   node scripts/repair-portable-text-links.mjs --apply
 */

import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))

function loadEnv(path) {
  try {
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const separator = trimmed.indexOf('=')
      if (separator === -1) continue
      const key = trimmed.slice(0, separator).trim()
      const value = trimmed.slice(separator + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // Environment variables may already be provided by the shell.
  }
}

loadEnv(join(scriptDir, '..', '.env'))

const applyChanges = process.argv.includes('--apply')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const normalize = (value) => value.replace(/\s+/g, ' ').trim()

function sourceLinks(rawHtml) {
  const document = new JSDOM(rawHtml).window.document
  return [...document.querySelectorAll('a[href]')]
    .map((anchor) => ({
      text: normalize(anchor.textContent ?? ''),
      href: anchor.getAttribute('href'),
      blank: anchor.getAttribute('target') === '_blank',
    }))
    .filter((link) => link.text && link.href)
}

function repairBody(body, links) {
  const unusedLinks = links.map((link, index) => ({ ...link, index }))
  const repaired = structuredClone(body)
  const restored = []
  const unmatchedSpans = []

  repaired.forEach((block, blockIndex) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return

    block.children.forEach((span, spanIndex) => {
      if (!Array.isArray(span.marks) || !span.marks.some((mark) => mark == null)) return

      const text = normalize(span.text ?? '')
      const matchIndex = unusedLinks.findIndex((link) => link.text === text)
      if (matchIndex === -1) {
        unmatchedSpans.push({ blockIndex, spanIndex, text })
        return
      }

      const [link] = unusedLinks.splice(matchIndex, 1)
      const key = `restored-link-${blockIndex}-${spanIndex}`
      span.marks = [...span.marks.filter((mark) => mark != null), key]
      block.markDefs = [
        ...(block.markDefs ?? []),
        { _key: key, _type: 'link', href: link.href, blank: link.blank },
      ]
      restored.push({ text, href: link.href })
    })
  })

  return { repaired, restored, unmatchedSpans, unusedLinks }
}

async function main() {
  if (applyChanges && !process.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN is required with --apply')
  }

  const posts = await client.fetch(`
    *[_type == "post" && defined(rawHtml) && length(body) > 0] {
      _id,
      _rev,
      title,
      rawHtml,
      body
    }
  `)

  let affectedPosts = 0
  let restoredLinks = 0
  let failures = 0

  for (const post of posts) {
    const hasBrokenMarks = post.body.some((block) =>
      block.children?.some((span) => span.marks?.some((mark) => mark == null)),
    )
    if (!hasBrokenMarks) continue

    affectedPosts += 1
    const result = repairBody(post.body, sourceLinks(post.rawHtml))

    if (result.unmatchedSpans.length > 0) {
      failures += result.unmatchedSpans.length
      console.error(`FAIL  ${post.title}`)
      console.error('      Unmatched spans:', result.unmatchedSpans)
      continue
    }

    restoredLinks += result.restored.length
    console.log(`${applyChanges ? 'FIXED' : 'READY'} ${post.title} (${result.restored.length} links)`)

    if (applyChanges) {
      await client.patch(post._id).ifRevisionId(post._rev).set({ body: result.repaired }).commit()
    }
  }

  console.log(`\n${applyChanges ? 'Restored' : 'Can restore'} ${restoredLinks} links across ${affectedPosts} articles.`)
  if (failures > 0) throw new Error(`${failures} broken spans could not be matched safely`)
  if (!applyChanges) console.log('Run again with --apply to update Sanity.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
