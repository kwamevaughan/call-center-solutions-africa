import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Meta' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ─── Content ────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary shown in blog listing cards (max 300 chars)',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'Featured Image URL',
      description: 'URL from ImageKit or any CDN (preferred)',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image (Sanity Asset)',
      description: 'Upload directly to Sanity (used if no URL above)',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'rawHtml',
      title: 'Legacy HTML Body',
      description: 'Migrated HTML from the old system. Rendered as-is until converted to rich text above.',
      type: 'text',
      group: 'content',
      hidden: ({ document }) => Boolean(document?.body && Array.isArray(document.body) && (document.body as unknown[]).length > 0),
    }),

    // ─── Taxonomy ───────────────────────────────────────────────────────
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Type a tag and press Enter to add it',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
    }),

    // ─── Author / Settings ───────────────────────────────────────────────
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'settings',
    }),

    // ─── Publishing ─────────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),

    // ─── SEO ────────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Recommended: 50–60 characters. Defaults to post title.',
      group: 'seo',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles over 60 chars may be truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Recommended: 120–160 characters',
      group: 'seo',
      validation: (Rule) =>
        Rule.max(160).warning('Meta descriptions over 160 chars may be truncated'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'string',
      description: 'Comma-separated keywords',
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave empty to use the default page URL',
      group: 'seo',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Defaults to Meta Title if empty',
      group: 'seo',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 2,
      description: 'Defaults to Meta Description if empty',
      group: 'seo',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      description: 'Hide this post from search engines',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
  ],

  orderings: [
    {
      title: 'Publish Date, New → Old',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Publish Date, Old → New',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      mainImageUrl: 'mainImageUrl',
      isPublished: 'isPublished',
      isDraft: 'isDraft',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, mainImageUrl, isPublished, isDraft, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'No date'
      const status = isDraft ? '· Draft' : !isPublished ? '· Unpublished' : ''
      return {
        title,
        media,
        subtitle: `${author ?? 'CCSA Team'} · ${date} ${status}`.trim(),
      }
    },
  },
})
