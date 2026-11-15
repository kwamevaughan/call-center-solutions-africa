/**
 * Move blog images into Sanity assets and restore inline images that the original
 * HTML -> Portable Text conversion dropped.
 *
 *   node scripts/migrate-images-to-sanity.mjs           # DRY RUN: downloads + verifies, uploads/writes nothing
 *   node scripts/migrate-images-to-sanity.mjs --write   # uploads, backs up old bodies to scripts/backups/, patches posts
 *
 * Per published post:
 *   1. `mainImageUrl` -> `mainImage` (Sanity image); mainImageUrl unset.
 *   2. Inline <img> from `rawHtml` -> `image` blocks inserted into `body`. The body is only replaced when
 *      (new body minus the images) is IDENTICAL to the current body, i.e. nobody has edited it since the
 *      conversion. Otherwise the post is skipped for body and reported.
 * `rawHtml` is never modified. Uploads are content-hashed, so re-running never duplicates assets.
 */
import { createClient } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { createRequire } from 'module'
import { JSDOM } from 'jsdom'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { randomUUID } from 'crypto'
const require = createRequire(import.meta.url)
const sanitySchemaModule = require('@sanity/schema')
const Schema = sanitySchemaModule.Schema ?? sanitySchemaModule.default?.Schema ?? sanitySchemaModule.default

const WRITE = process.argv.includes('--write')
for (const f of ['.env', '.env.local']) {
  try { for (const l of readFileSync(new URL(`../${f}`, import.meta.url), 'utf8').split('\n')) { const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '') } } catch {}
}
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN, perspective: 'raw',
})
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif', 'image/svg+xml': 'svg' }

// Same block schema CCSA's convert-html-to-pt.mjs used, plus an `image` member.
const compiled = Schema.compile({
  name: 'ccsa',
  types: [{ type: 'object', name: 'post', fields: [{ title: 'Body', name: 'body', type: 'array', of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }, { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'H4', value: 'h4' }, { title: 'Quote', value: 'blockquote' }],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
      marks: {
        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }, { title: 'Underline', value: 'underline' }, { title: 'Code', value: 'code' }],
        annotations: [{ name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }, { name: 'blank', type: 'boolean', title: 'Open in new tab' }] }],
      },
    },
    { type: 'image', name: 'image', fields: [{ name: 'alt', type: 'string' }, { name: 'caption', type: 'string' }] },
  ] }] }],
})
const bodyType = compiled.get('post').fields.find((f) => f.name === 'body').type
const parseHtml = (h) => new JSDOM(h).window.document

const rules = [{
  deserialize(el) {
    if (el.tagName?.toLowerCase() !== 'img') return undefined
    return { _type: 'image', _key: key(), _src: el.getAttribute('src') ?? '', _alt: el.getAttribute('alt') ?? '' }
  },
}]
/** Studio only allows spans inside a text block: hoist inline images to their own blocks. */
function hoist(blocks) {
  const out = []
  for (const b of blocks) {
    if (b._type !== 'block' || !b.children?.some((c) => c._type !== 'span')) { out.push(b); continue }
    let run = []
    const flush = () => { if (run.some((c) => c.text?.trim())) out.push({ ...b, _key: key(), children: run }); run = [] }
    for (const c of b.children) { if (c._type === 'span') run.push(c); else { flush(); out.push(c) } }
    flush()
  }
  return out
}
const convert = (html) => hoist(htmlToBlocks(`<div>${html}</div>`, bodyType, { parseHtml, rules }))
/** Comparable form of a block: drop _key, rename markDef keys by position, ignore `blank` (added later by the link-repair script). */
function canonBlock(b) {
  if (b._type !== 'block') return JSON.parse(JSON.stringify(b, (k, v) => (k === '_key' ? undefined : v)))
  const ids = new Map((b.markDefs ?? []).map((m, i) => [m._key, `m${i}`]))
  const { _key, ...rest } = b
  return JSON.parse(JSON.stringify({
    ...rest,
    markDefs: (b.markDefs ?? []).map(({ _key: k, blank, ...m }) => m),
    children: (b.children ?? []).map(({ _key: k, ...c }) => ({ ...c, marks: (c.marks ?? []).map((m) => ids.get(m) ?? m).sort() })),
  }, (k, v) => (k === 'markDefs' || k === 'marks' || v !== undefined ? v : undefined)))
}
const sortKeys = (v) => (Array.isArray(v) ? v.map(sortKeys) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])])) : v)
const sig = (b) => JSON.stringify(sortKeys(canonBlock(b)))

const cache = new Map()
const stats = { downloaded: 0, bytes: 0, uploaded: 0, failed: [] }
async function fetchImage(url) {
  if (url.startsWith('data:')) {
    const m = url.match(/^data:([^;,]+)(;base64)?,(.*)$/s)
    if (!m) throw new Error('bad data URI')
    return { buf: m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3])), type: m[1] }
  }
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = (res.headers.get('content-type') || '').split(';')[0]
  if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
  return { buf: Buffer.from(await res.arrayBuffer()), type }
}
function asset(url) {
  if (!cache.has(url)) cache.set(url, (async () => {
    try {
      const { buf, type } = await fetchImage(url)
      stats.downloaded++; stats.bytes += buf.length
      const base = url.startsWith('data:') ? `inline-${buf.length}` : decodeURIComponent(new URL(url).pathname.split('/').pop() || 'image').replace(/\.[a-z0-9]+$/i, '')
      if (!WRITE) return { ref: 'dry-run' }
      const doc = await sanity.assets.upload('image', buf, { filename: `${base}.${EXT[type] ?? 'jpg'}`, contentType: type })
      stats.uploaded++
      return { ref: doc._id }
    } catch (e) { stats.failed.push(`${url.slice(0, 100)} -> ${e.message}`); return { error: e.message } }
  })())
  return cache.get(url)
}
const looksLikeFilename = (s) => !s || /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(s)
const imgRef = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })

const posts = await sanity.fetch(`*[_type=="post" && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current,rawHtml,body,mainImageUrl,mainImage}`)
const drafts = Object.fromEntries((await sanity.fetch(`*[_type=="post" && _id in path("drafts.**")]{_id,body}`)).map((d) => [d._id, d]))
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${posts.length} posts | ${Object.keys(drafts).length} Studio drafts`)
if (WRITE) { mkdirSync(new URL('./backups/', import.meta.url), { recursive: true }); writeFileSync(new URL(`./backups/posts-before-image-migration-${Date.now()}.json`, import.meta.url), JSON.stringify(posts, null, 1)) }

const report = []
const queue = [...posts]
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const p = queue.shift(), set = {}, unset = [], notes = []
    let featured = 0, inline = 0
    if (p.mainImageUrl) {
      const a = await asset(p.mainImageUrl)
      if (a.ref) { set.mainImage = { ...imgRef(a.ref), alt: p.mainImage?.alt || p.title }; unset.push('mainImageUrl'); featured = 1 } else notes.push('featured image not migrated')
    }
    const hasImgs = /<img/i.test(p.rawHtml || '')
    if (hasImgs && !p.body?.some((b) => b._type === 'image')) {
      const converted = convert(p.rawHtml)
      const imgs = converted.filter((b) => b._type === 'image')
      const nonImg = converted.filter((x) => x._type !== 'image')
      const same = nonImg.length === (p.body ?? []).length && nonImg.every((x, i) => sig(x) === sig(p.body[i]))
      if (!same) notes.push('body differs from rawHtml conversion (edited since?) -> inline images NOT restored; review manually')
      else {
        // keep the EXISTING blocks (they carry later link repairs); only insert the images between them
        const body = []
        let j = 0, failed = 0
        for (const b of converted) {
          if (b._type !== 'image') { body.push(p.body[j++]); continue }
          const a = await asset(b._src)
          if (!a.ref) { failed++; notes.push(`inline image failed: ${b._src.slice(0, 60)}`); continue }
          body.push({ ...imgRef(a.ref), _key: b._key, alt: looksLikeFilename(b._alt) ? p.title : b._alt })
        }
        set.body = body; inline = imgs.length - failed
      }
    }
    if (WRITE && (Object.keys(set).length || unset.length)) {
      const apply = (id) => sanity.patch(id).set(set).unset(unset).commit()
      await apply(p._id)
      const d = drafts[`drafts.${p._id}`]
      if (d) { if (JSON.stringify(d.body ?? null) === JSON.stringify(p.body ?? null)) await apply(d._id); else notes.push('Studio draft differs; draft not touched') }
    }
    report.push({ slug: p.slug.slice(0, 52), featured, inline, notes: notes.join('; ') })
  }
}))
console.table(report.sort((a, b) => a.slug.localeCompare(b.slug)))
console.log(`featured: ${report.reduce((a, r) => a + r.featured, 0)} | inline images restored: ${report.reduce((a, r) => a + r.inline, 0)} | unique downloads: ${stats.downloaded} (${(stats.bytes / 1048576).toFixed(1)} MB) | uploaded: ${stats.uploaded} | failed: ${stats.failed.length}`)
for (const f of stats.failed) console.log('  FAILED', f)
if (!WRITE) console.log('Dry run only (nothing uploaded or written). Re-run with --write.')
