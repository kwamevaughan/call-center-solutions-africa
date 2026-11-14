import type { PortableTextBlock } from '@portabletext/types'
import type { Image as SanityImage } from 'sanity'

// ─── Primitive helpers ───────────────────────────────────────────────────────

export interface SanitySlug {
  current: string
}

// ─── Author ──────────────────────────────────────────────────────────────────

export interface SanityAuthor {
  _id: string
  name: string
  slug?: SanitySlug
  email?: string
  image?: SanityImage
  bio?: string
  role?: string
  linkedin?: string
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface SanityCategory {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  color?: string
}

// ─── Post (from Sanity) ───────────────────────────────────────────────────────

export interface SanityPost {
  _id: string
  _createdAt: string
  title: string
  slug: SanitySlug
  excerpt?: string
  mainImageUrl?: string
  mainImage?: SanityImage & { alt?: string; caption?: string }
  body?: PortableTextBlock[]
  rawHtml?: string
  author?: SanityAuthor
  categories?: SanityCategory[]
  tags?: string[]
  publishedAt?: string
  isPublished: boolean
  isDraft: boolean
  isFeatured?: boolean
  // SEO
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  metaKeywords?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
}

// ─── Formatted post (used by components) ─────────────────────────────────────

export interface FormattedPost {
  id: string
  title: string
  excerpt: string
  /** Portable Text blocks (new content) or legacy rawHtml string */
  content: PortableTextBlock[] | string | null
  image: string | null
  slug: string
  category: string | null
  categoryName: string | null
  categoryData: SanityCategory[]
  tags: string[]
  author: string
  authorId: string | undefined
  authorData: SanityAuthor | null
  date: string
  readTime: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  focusKeyword: string
  canonicalUrl: string | null
  ogTitle: string
  ogDescription: string
  twitterCard: string
  isPublished: boolean
  isDraft: boolean
}

// ─── Blog service response ────────────────────────────────────────────────────

export interface BlogListResult {
  blogs: FormattedPost[]
  totalCount: number
  hasMore: boolean
}

// ─── Careers ─────────────────────────────────────────────────────────────────

export type JobStatus = 'open' | 'closed' | 'draft'

export interface ExtraSection {
  _key: string
  heading: string
  items: string[]
}

export interface SanityJobPosting {
  _id: string
  _createdAt: string
  title: string
  slug: SanitySlug
  department?: string
  status: JobStatus
  closingDate?: string
  location?: string
  employmentType?: string
  openings?: number
  hiringTimeline?: string
  languages?: string[]
  tags?: string[]
  publishedAt?: string
  order?: number
  summary?: string
  aboutCompany?: unknown[]
  roleOverview?: unknown[]
  responsibilities?: string[]
  requirements?: string[]
  idealCandidate?: string[]
  benefits?: string[]
  extraSections?: ExtraSection[]
  metaTitle?: string
  metaDescription?: string
}
