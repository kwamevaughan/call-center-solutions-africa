/**
 * Migration script: Supabase → Sanity
 *
 * Migrates:
 *  - admin_users  → Sanity author documents
 *  - blog_categories → Sanity category documents
 *  - blog_tags (names only) → stored as string tags on each post
 *  - blogs → Sanity post documents
 *
 * The HTML body is stored in `rawHtml` as-is (safe, lossless).
 * A second pass can convert rawHtml → Portable Text body when needed.
 *
 * Run with:
 *   node scripts/migrate-to-sanity.mjs
 *
 * Requires env vars:
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SANITY_PROJECT_ID,
 *   NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
 */

import { createClient as createSupabase } from '@supabase/supabase-js'
import { createClient as createSanity } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// ─── Load env from .env file ─────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '..', '.env')

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
    console.warn('⚠️  Could not read .env file — relying on environment variables')
  }
}

loadEnv(envPath)

// ─── Clients ──────────────────────────────────────────────────────────────────

const supabase = createSupabase(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
)

const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Deterministic Sanity document ID from a source type + source ID */
function sanityId(type, sourceId) {
  return `migrated-${type}-${String(sourceId).replace(/[^a-zA-Z0-9_-]/g, '-')}`
}

/** Slugify a string */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ─── Step 1: Migrate admin_users → author ─────────────────────────────────────

async function migrateAuthors() {
  console.log('\n📋 Migrating authors...')
  const { data: users, error } = await supabase
    .from('admin_users')
    .select('id, name, username')

  if (error) throw new Error(`Supabase admin_users error: ${error.message}`)

  const mutations = users.map((user) => ({
    createOrReplace: {
      _id: sanityId('author', user.id),
      _type: 'author',
      name: user.name || user.username,
      email: user.username?.includes('@') ? user.username : undefined,
      slug: {
        _type: 'slug',
        current: slugify(user.name || user.username),
      },
      role: 'Content Team',
    },
  }))

  const result = await sanity.mutate(mutations)
  console.log(`  ✅ Migrated ${users.length} author(s)`)
  return Object.fromEntries(users.map((u) => [u.id, sanityId('author', u.id)]))
}

// ─── Step 2: Migrate blog_categories → category ───────────────────────────────

async function migrateCategories() {
  console.log('\n📋 Migrating categories...')
  const { data: cats, error } = await supabase
    .from('blog_categories')
    .select('*')

  if (error) throw new Error(`Supabase blog_categories error: ${error.message}`)

  const mutations = cats.map((cat) => ({
    createOrReplace: {
      _id: sanityId('category', cat.id),
      _type: 'category',
      name: cat.name,
      slug: {
        _type: 'slug',
        current: cat.slug || slugify(cat.name),
      },
      description: cat.description || undefined,
    },
  }))

  await sanity.mutate(mutations)
  console.log(`  ✅ Migrated ${cats.length} category(ies)`)
  return Object.fromEntries(cats.map((c) => [c.id, sanityId('category', c.id)]))
}

// ─── Step 3: Build post-tags lookup ───────────────────────────────────────────

async function buildPostTagsMap() {
  const { data: postTags, error: ptErr } = await supabase
    .from('blog_post_tags')
    .select('blog_id, tag_id')
  if (ptErr) throw new Error(`blog_post_tags error: ${ptErr.message}`)

  const { data: tags, error: tagErr } = await supabase
    .from('blog_tags')
    .select('id, name')
  if (tagErr) throw new Error(`blog_tags error: ${tagErr.message}`)

  const tagNameById = Object.fromEntries(tags.map((t) => [t.id, t.name]))
  const map = {}
  for (const pt of postTags) {
    if (!map[pt.blog_id]) map[pt.blog_id] = []
    const name = tagNameById[pt.tag_id]
    if (name) map[pt.blog_id].push(name)
  }
  return map
}

// ─── Step 4: Migrate blogs → post ────────────────────────────────────────────

async function migratePosts(authorMap, categoryMap, postTagsMap) {
  console.log('\n📋 Migrating blog posts...')

  const { data: posts, error } = await supabase
    .from('blogs')
    .select('*')
    .order('id')

  if (error) throw new Error(`Supabase blogs error: ${error.message}`)

  let migrated = 0
  let skipped = 0

  // Sanity has a max of 200 mutations per request
  const BATCH = 50
  const allMutations = []

  for (const post of posts) {
    const sanityPost = {
      _id: sanityId('post', post.id),
      _type: 'post',

      title: post.article_name,
      slug: {
        _type: 'slug',
        current: post.slug || slugify(post.article_name),
      },

      // Store the original TipTap HTML exactly — no data loss
      rawHtml: post.article_body || '',

      // Featured image
      ...(post.article_image ? { mainImageUrl: post.article_image } : {}),

      // Excerpt from meta_description (best proxy)
      excerpt: post.meta_description || undefined,

      // Publishing
      isPublished: post.is_published ?? false,
      isDraft: post.is_draft ?? true,
      publishedAt: post.publish_date
        ? new Date(post.publish_date).toISOString()
        : new Date(post.created_at).toISOString(),

      // SEO
      metaTitle: post.meta_title || undefined,
      metaDescription: post.meta_description || undefined,
      focusKeyword: post.focus_keyword || undefined,
      metaKeywords: post.meta_keywords || undefined,
      twitterCard: 'summary_large_image',
      noIndex: false,

      // Author reference
      ...(post.author && authorMap[post.author]
        ? {
            author: {
              _type: 'reference',
              _ref: authorMap[post.author],
            },
          }
        : {}),

      // Category reference
      ...(post.category_id && categoryMap[post.category_id]
        ? {
            categories: [
              {
                _key: `cat-${post.id}`,
                _type: 'reference',
                _ref: categoryMap[post.category_id],
              },
            ],
          }
        : post.article_category
        ? {
            // article_category is a free-text string; create/reuse a category for it
            categories: [
              {
                _key: `cat-${post.id}`,
                _type: 'reference',
                _ref: sanityId('category', slugify(post.article_category)),
              },
            ],
          }
        : {}),

      // Tags
      tags: postTagsMap[post.id] ?? [],
    }

    allMutations.push({ createOrReplace: sanityPost })
    migrated++
  }

  // Send one at a time — blog HTML bodies can be large
  for (let i = 0; i < allMutations.length; i++) {
    await sanity.mutate([allMutations[i]])
    const title = allMutations[i].createOrReplace.title
    console.log(`  → [${i + 1}/${allMutations.length}] "${title}"`)
  }

  console.log(`  ✅ Migrated ${migrated} post(s), skipped ${skipped}`)
}

// ─── Step 5: Create categories for free-text article_category values ──────────

async function ensureFreetextCategories() {
  console.log('\n📋 Ensuring free-text categories...')
  const { data: posts } = await supabase
    .from('blogs')
    .select('article_category')
    .not('article_category', 'is', null)

  const unique = [...new Set(posts.map((p) => p.article_category).filter(Boolean))]
  const mutations = unique.map((name) => ({
    createIfNotExists: {
      _id: sanityId('category', slugify(name)),
      _type: 'category',
      name,
      slug: { _type: 'slug', current: slugify(name) },
    },
  }))

  if (mutations.length > 0) {
    await sanity.mutate(mutations)
    console.log(`  ✅ Ensured ${mutations.length} free-text category(ies)`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting CCSA Supabase → Sanity migration')
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'jf7k2yuf'}`)
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}`)

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('\n❌ SANITY_WRITE_TOKEN is not set. Cannot write to Sanity.')
    process.exit(1)
  }

  try {
    await ensureFreetextCategories()
    const authorMap = await migrateAuthors()
    const categoryMap = await migrateCategories()
    const postTagsMap = await buildPostTagsMap()
    await migratePosts(authorMap, categoryMap, postTagsMap)

    console.log('\n🎉 Migration complete!\n')
    console.log('Next steps:')
    console.log('  1. Go to /studio to verify content')
    console.log('  2. Posts with rawHtml need their body field filled in Sanity Studio')
    console.log('     or run: node scripts/convert-html-to-pt.mjs')
    console.log('  3. Set CORS origins at sanity.io/manage for your domain')
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    process.exit(1)
  }
}

main()
